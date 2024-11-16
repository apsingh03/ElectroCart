const express = require("express");
const router = express.Router();

const childFilterController = require("../../../controller/admin/Filter/ChildFilterController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/child/name

router.post(
  "/name",
  middleware.authenticateAdmin,
  childFilterController.createChildFilter
);

router.get(
  "/name",
  middleware.authenticateAdmin,
  childFilterController.getChildFilter
);

router.patch(
  "/name/:id",
  middleware.authenticateAdmin,
  childFilterController.updateChildFilter
);

router.delete(
  "/name/:id",
  middleware.authenticateAdmin,
  childFilterController.deleteChildFilter
);

module.exports = router;
