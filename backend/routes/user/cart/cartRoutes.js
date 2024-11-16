const express = require("express");
const router = express.Router();

const cartController = require("../../../controller/user/cart/CartController.js");

const userAuth = require("../../../middleware/UserAuth.js");

// client/product/
router.post("/cart", userAuth.authenticateUser, cartController.createUserCart);
router.get("/cart", userAuth.authenticateUser, cartController.getUserCart);

router.patch(
  "/cartQty/:cartItem_id/",
  userAuth.authenticateUser,
  cartController.updateUserCartQty
);

router.delete(
  "/cart/:cart_id/:cartItem_id",
  userAuth.authenticateUser,
  cartController.deleteUserCart
);

module.exports = router;
