const express = require("express");
const router = express.Router();

const parentMenuController = require("../../../controller/admin/Menu/ParentMenuController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get(
  "/name",
  middleware.authenticateAdmin,
  parentMenuController.getParentMenu
);

router.post(
  "/name",
  middleware.authenticateAdmin,
  parentMenuController.createParentMenu
);

router.patch(
  "/name/:id",
  middleware.authenticateAdmin,
  parentMenuController.updateParentMenu
);

router.delete(
  "/name/:id",
  middleware.authenticateAdmin,
  parentMenuController.deleteParentMenu
);

module.exports = router;
