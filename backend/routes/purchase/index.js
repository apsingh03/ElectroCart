const express = require("express");
const router = express.Router();

const purchaseController = require("../../controller/purchase/PurchaseController.js");

const userAuth = require("../../middleware/UserAuth.js");

router.get("/buy", userAuth.authenticateUser, purchaseController.purchase);

router.put(
  "/updateCartstatus",
  userAuth.authenticateUser,
  purchaseController.updateTransactionStatus
);

module.exports = router;
