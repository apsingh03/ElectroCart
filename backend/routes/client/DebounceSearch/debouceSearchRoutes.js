const express = require("express");
const router = express.Router();

const controller = require("../../../controller/client/DebounceSearch/DebounceSearchController.js");

// client/product/CurrentRoutes
router.get("/search", controller.clientDebouncedSearch);

module.exports = router;
