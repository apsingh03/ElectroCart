const db = require("../../../models");

// Tables
const BannerCarousel = db.bannerCarousel;
const BannerCarouselImages = db.bannerCarouselImages;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createChildBannerCarousel = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { imageSrc, imageAlt, routeLink, parent_id } = req.body;

    const createQuery = await BannerCarouselImages.create(
      {
        imageSrc,
        imageAlt,
        routeLink,
        parent_id,
        isFavorite: false,
        createdAt: new Date(),
        admin_id: req.admin.id,
      },
      { transaction: t }
    );

    const updatedQuery = await BannerCarouselImages.findOne({
      where: { id: createQuery.id, admin_id: req.admin.id },
      include: [
        {
          model: BannerCarousel,
          // required: true,
          as: "bannerCarouselImagesBannerCarousel",
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

const getChildBannerCarousel = async (req, res) => {
  try {
    // console.log("getChildBannerCarousel - ");
    // console.log("admin_id - ", req.admin.id);
    const query = await BannerCarouselImages.findAll({
      attributes: {
        exclude: ["admin_id", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: BannerCarousel,
          // required: true,
          as: "bannerCarouselImagesBannerCarousel",
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

const updateChildBannerCarousel = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("req.body - ", req.body.updatedData);

    const [updated] = await BannerCarouselImages.update(
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
      const query = await BannerCarouselImages.findOne({
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

const deleteChildBannerCarousel = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await BannerCarouselImages.destroy({
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

const childBannerCarouselIsFavorite = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const isFavoriteStatus = req.body.isFavoriteStatus;
    // console.log("----------categoryIsFavorite ----------------");
    if (isFavoriteStatus === "favoriteIt") {
      // want to favorite it
      const query = await BannerCarouselImages.update(
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
      const query = await BannerCarouselImages.update(
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
  createChildBannerCarousel,
  getChildBannerCarousel,
  updateChildBannerCarousel,
  deleteChildBannerCarousel,
  childBannerCarouselIsFavorite,
};
