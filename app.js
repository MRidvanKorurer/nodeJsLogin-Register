const express = require("express");
const dotenv = require("dotenv");
const conn = require("./db");
const userRouter = require("./routes/user");


dotenv.config();

const app = express();


//* middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


//* routing
app.use("/api/user", userRouter);


//* database conn
conn();



app.listen(process.env.PORT, () => {
    console.log(`Application running on port: ${process.env.PORT}`);
});




