const express = require("express");
const router = express.Router();

const controller = require("../../../controller/admin/Testimonial/ChildTestimonialController.js");

const middleware = require("../../../middleware/AdminAuth.js");

router.get(
  "/testimonial",
  middleware.authenticateAdmin,
  controller.getChildTestimonial
);

router.post(
  "/testimonial",
  middleware.authenticateAdmin,
  controller.createChildTestimonial
);

router.patch(
  "/testimonial/:id",
  middleware.authenticateAdmin,
  controller.updateChildTestimonial
);

router.delete(
  "/testimonial/:id",
  middleware.authenticateAdmin,
  controller.deleteChildTestimonial
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  controller.childTestimonialIsFavorite
);

module.exports = router;
