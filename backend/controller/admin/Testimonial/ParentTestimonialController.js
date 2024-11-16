const db = require("../../../models");

// Tables
const Testimonial = db.testimonial;
const TestimonialDetails = db.testimonialDetails;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createParentTestimonial = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { name, animation, timer, width, height, objectFit } = req.body;
    const nameAlreadyExist = await Testimonial.findOne({
      where: { name: name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const createQuery = await Testimonial.create(
        {
          name,
          animation,
          timer,
          width,
          height,
          objectFit,
          isFavorite: false,
          createdAt: new Date(),
          admin_id: req.admin.id,
        },
        { transaction: t }
      );

      const updatedQuery = await Testimonial.findOne({
        where: { id: createQuery.id, admin_id: req.admin.id },
        transaction: t,
      });

      await t.commit();
      return res.status(200).send({ msg: "success", query: updatedQuery });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const getParentTestimonial = async (req, res) => {
  try {
    console.log("getParentTestimonial - ");
    // console.log("admin_id - ", req.admin.id);
    const query = await Testimonial.findAll({
      // include: [
      //   {
      //     model: ChildMenu,
      //     required: false,
      //     as: "menuChildData",
      //   },
      // ],
      where: { admin_id: req.admin.id },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateParentTestimonial = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("req.body - ", req.body.updatedData);

    const [updated] = await Testimonial.update(
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
      const query = await Testimonial.findOne({
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

const deleteParentTestimonial = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await Testimonial.destroy({
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

const testimonialIsFavorite = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const isFavoriteStatus = req.body.isFavoriteStatus;
    // console.log("----------categoryIsFavorite ----------------");
    if (isFavoriteStatus === "favoriteIt") {
      // want to favorite it
      const query = await Testimonial.update(
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
      const query = await Testimonial.update(
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
  createParentTestimonial,
  getParentTestimonial,
  updateParentTestimonial,
  deleteParentTestimonial,
  testimonialIsFavorite,
};
