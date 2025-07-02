const express = require("express");
const router = express.Router();

const menuNestedSubMenu = require("../../../controller/admin/Menu/menuNestedSubMenu.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/child/name

router.post(
  "/name",
  middleware.authenticateAdmin,
  menuNestedSubMenu.createMenuNestedSubMenu
);

router.get(
  "/name",
  middleware.authenticateAdmin,
  menuNestedSubMenu.getMenuNestedSubMenu
);

router.patch(
  "/name/:id",
  middleware.authenticateAdmin,
  menuNestedSubMenu.updateMenuNestedSubMenu
);

router.delete(
  "/name/:id",
  middleware.authenticateAdmin,
  menuNestedSubMenu.deleteMenuNestedSubMenu
);

module.exports = router;
