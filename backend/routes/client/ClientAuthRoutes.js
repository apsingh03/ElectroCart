const router = require("express").Router();

const clientAuthController = require("../../controller/client/ClientAuthController.js");

router.post("/signUp", clientAuthController.clientSignUp);
router.post("/login", clientAuthController.clientLogIn);

module.exports = router;
