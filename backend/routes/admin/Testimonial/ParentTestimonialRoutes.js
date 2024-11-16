const express = require("express");
const router = express.Router();

const controller = require("../../../controller/admin/Testimonial/ParentTestimonialController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get(
  "/testimonial",
  middleware.authenticateAdmin,
  controller.getParentTestimonial
);

router.post(
  "/testimonial",
  middleware.authenticateAdmin,
  controller.createParentTestimonial
);

router.patch(
  "/testimonial/:id",
  middleware.authenticateAdmin,
  controller.updateParentTestimonial
);

router.delete(
  "/testimonial/:id",
  middleware.authenticateAdmin,
  controller.deleteParentTestimonial
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  controller.testimonialIsFavorite
);

module.exports = router;
