const express = require("express");
const userController = require("../controllers/user");


const router = express.Router();


router.get("/", userController.getUser);

router.get("/:id", userController.getIdUser);

router.post("/", userController.postUser);

router.post("/login", userController.loginUser);

router.put("/:id", userController.putUser);

router.delete("/:id", userController.deleteUser);



module.exports = router;