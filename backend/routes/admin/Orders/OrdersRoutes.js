const express = require("express");
const router = express.Router();

const OrdersController = require("../../../controller/admin/Order/OrdersController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get("/order", middleware.authenticateAdmin, OrdersController.getOrders);

router.patch(
  "/deliveryStatus",
  middleware.authenticateAdmin,
  OrdersController.updateDeliveryStatus
);

module.exports = router;
