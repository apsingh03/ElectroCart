const express = require("express");
const router = express.Router();

const childMenuController = require("../../../controller/admin/Menu/ChildMenuController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/child/name

router.post(
  "/name",
  middleware.authenticateAdmin,
  childMenuController.createChildMenu
);

router.get(
  "/name",
  middleware.authenticateAdmin,
  childMenuController.getChildMenu
);

router.patch(
  "/name/:id",
  middleware.authenticateAdmin,
  childMenuController.updateChildMenu
);

router.delete(
  "/name/:id",
  middleware.authenticateAdmin,
  childMenuController.deleteChildMenu
);

module.exports = router;
