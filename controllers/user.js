const {User, validationRegister, validationLogin} = require("../models/user");
const bcrypt = require("bcrypt");




module.exports.getUser = async (req, res) => {
    try {
        const user = await User.find();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}


module.exports.getIdUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}


module.exports.postUser = async (req, res) => {
    const {error} = validationRegister(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).send("bu email kullanılıyor");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();

        const token = user.createAuthToken();

        res.header("x-auth-token", token).send(user);
   
        // const newUser = await user.save();

        // res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}


module.exports.loginUser = async (req, res) => {
    const {error} = validationLogin(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});

    if(!user) {
        res.status(400).json({hata: "email ya da paralo hatalı"});
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if(!match) {
        res.status(400).json({hata: "email ya da paralo hatalı"});
    }

    const token = user.createAuthToken();

    res.send(token);


}


module.exports.putUser = async (req, res) => {
    const id = req.params.id;

    const {error} = validateRegister(req.body);

    if(error) {
        return res.status(400).json(error.details[0].message);
    }
    try {
        const user = await User.findByIdAndUpdate(id, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }, {new: true});

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}


module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}