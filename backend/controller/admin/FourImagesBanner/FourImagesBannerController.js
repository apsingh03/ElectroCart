const db = require("../../../models");

// Tables

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const FourImagesBanner = db.fourImagesBanner;

const createFourImagesBanner = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { imageSrc, imageAlt, routeLink } = req.body;

    // console.log("Req.body - ", req.body);
    const createQuery = await FourImagesBanner.create(
      {
        imageSrc,
        imageAlt,
        routeLink,
        isFavorite: 0,
        createdAt: new Date(),
        admin_id: req.admin.id,
      },
      { transaction: t }
    );

    const updatedQuery = await FourImagesBanner.findOne({
      where: { id: createQuery.id, admin_id: req.admin.id },
      order: [["id", "Asc"]],
      transaction: t,
    });

    await t.commit();
    return res.status(200).send({ msg: "success", query: updatedQuery });
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const getFourImagesBanner = async (req, res) => {
  try {
    const query = await FourImagesBanner.findAll({
      attributes: {
        exclude: ["admin_id", "createdAt", "updatedAt"],
      },

      where: { admin_id: req.admin.id },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateFourImagesBanner = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("req.body - ", req.body.updatedData);

    const [updated] = await FourImagesBanner.update(
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
      const query = await FourImagesBanner.findOne({
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

const deleteFourImagesBanner = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await FourImagesBanner.destroy({
      where: { id: req.params.id, admin_id: req.admin.id },
      transaction: t,
    });

    if (query === 0) {
      await t.rollback();
      return res.status(404).send({ msg: "Record not found" });
    }

    // console.log("query Delete - ", query);
    await t.commit();
    return res.status(200).send({ msg: "success" });
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const fourImagesBannerIsFavorite = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const isFavoriteStatus = req.body.isFavoriteStatus;
    console.log("----------fourImagesBannerIsFavorite ----------------");
    if (isFavoriteStatus === "favoriteIt") {
      // want to favorite it
      const query = await FourImagesBanner.update(
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
      const query = await FourImagesBanner.update(
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
  createFourImagesBanner,
  getFourImagesBanner,
  updateFourImagesBanner,
  deleteFourImagesBanner,
  fourImagesBannerIsFavorite,
};
