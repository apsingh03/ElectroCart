const db = require("../../../models");

// Tables
const Testimonial = db.testimonial;
const TestimonialDetails = db.testimonialDetails;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createChildTestimonial = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { customerName, imageSrc, imageAlt, customerMsg, parent_id } =
      req.body;

    const createQuery = await TestimonialDetails.create(
      {
        customerName,
        imageSrc,
        imageAlt,
        customerMsg,
        parent_id,
        isFavorite: false,
        createdAt: new Date(),
        admin_id: req.admin.id,
      },
      { transaction: t }
    );

    const updatedQuery = await TestimonialDetails.findOne({
      where: { id: createQuery.id, admin_id: req.admin.id },
      include: [
        {
          model: Testimonial,
          // required: true,
          as: "testimonialDetailsTestimonial",
          attributes: {
            exclude: [
              "admin_id",
              "animation",
              "createdAt",
              "height",
              "width",
              "isFavorite",
              "objectFit",
              "timer",
              "updatedAt",
            ],
          },
        },
      ],
      transaction: t,
    });

    await t.commit();
    return res.status(200).send({ msg: "success", query: updatedQuery });
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const getChildTestimonial = async (req, res) => {
  try {
    // console.log("getChildBannerCarousel - ");
    // console.log("admin_id - ", req.admin.id);
    const query = await TestimonialDetails.findAll({
      attributes: {
        exclude: ["admin_id", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Testimonial,
          // required: true,
          as: "testimonialDetailsTestimonial",
          attributes: {
            exclude: [
              "admin_id",
              "animation",
              "createdAt",
              "height",
              "width",
              "isFavorite",
              "objectFit",
              "timer",
              "updatedAt",
            ],
          },
        },
      ],
      where: { admin_id: req.admin.id },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateChildTestimonial = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("req.body - ", req.body.updatedData);

    const [updated] = await TestimonialDetails.update(
      {
        ...req.body.updatedData,
        updatedAt: new Date(),
      },
      {
        where: { id: req.params.id, admin_id: req.admin.id },
        transaction: t,
      }
    );

    // Check if any rows were updated
    if (updated) {
      // Fetch the updated record
      const query = await TestimonialDetails.findOne({
        where: { id: req.params.id, admin_id: req.admin.id },
        transaction: t,
      });
      await t.commit();
      return res.status(200).send({ msg: "success", query });
    } else {
      await t.rollback();
      return res.status(404).send({ msg: "Record not found" });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const deleteChildTestimonial = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await TestimonialDetails.destroy({
      where: { id: req.params.id, admin_id: req.admin.id },
      transaction: t,
    });

    if (query === 0) {
      await t.rollback();
      return res.status(404).send({ msg: "Record not found" });
    }

    await t.commit();
    return res.status(200).send({ msg: "success" });
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const childTestimonialIsFavorite = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const isFavoriteStatus = req.body.isFavoriteStatus;
    // console.log("----------categoryIsFavorite ----------------");
    if (isFavoriteStatus === "favoriteIt") {
      // want to favorite it
      const query = await TestimonialDetails.update(
        {
          isFavorite: 1,
        },
        { where: { id: productId, admin_id: req.admin.id }, transaction: t }
      );
      await t.commit();
      return res.status(200).send({ msg: "success", query: 1 });
    }

    if (isFavoriteStatus === "unFavoriteIt") {
      // want to un favorite it
      const query = await TestimonialDetails.update(
        {
          isFavorite: 0,
        },
        { where: { id: productId, admin_id: req.admin.id }, transaction: t }
      );
      await t.commit();
      return res.status(200).send({ msg: "success", query: 0 });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createChildTestimonial,
  getChildTestimonial,
  updateChildTestimonial,
  deleteChildTestimonial,
  childTestimonialIsFavorite,
};
