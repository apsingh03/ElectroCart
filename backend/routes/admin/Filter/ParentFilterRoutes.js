const express = require("express");
const router = express.Router();

const parentFilterController = require("../../../controller/admin/Filter/ParentFilterController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get(
  "/name",
  middleware.authenticateAdmin,
  parentFilterController.getParentFilter
);

router.post(
  "/name",
  middleware.authenticateAdmin,
  parentFilterController.createParentFilter
);

router.patch(
  "/name/:id",
  middleware.authenticateAdmin,
  parentFilterController.updateParentFilter
);

router.delete(
  "/name/:id",
  middleware.authenticateAdmin,
  parentFilterController.deleteParentFilter
);

module.exports = router;
