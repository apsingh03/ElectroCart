const router = require("express").Router();

const adminAuthController = require("../../controller/admin/AdminAuthController.js");
// admin/auth/signUp
router.post("/signUp", adminAuthController.adminSignUp);
// admin/auth/login
router.post("/login", adminAuthController.adminLogIn);

module.exports = router;
