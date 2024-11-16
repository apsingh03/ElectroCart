const express = require("express");
const router = express.Router();

const userController = require("../../../controller/user/user/UserController.js");

const userAuth = require("../../../middleware/UserAuth.js");

router.get("/user", userAuth.authenticateUser, userController.getUserInfo);

router.post(
  "/favorite",
  userAuth.authenticateUser,
  userController.createUserFavoriteProduct
);
router.get(
  "/favorite",
  userAuth.authenticateUser,
  userController.getUserFavoriteProduct
);
router.delete(
  "/favorite/:id",
  userAuth.authenticateUser,
  userController.deleteUserFavoriteProduct
);

module.exports = router;
