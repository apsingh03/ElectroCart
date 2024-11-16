const db = require("../../../models");

// Tables

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const AdminAuth = db.adminAuth;
const Category = db.category;
const ProductSizes = db.productSizes;
const PSize = db.pSize;
const Product = db.product;
const ProductImages = db.productImages;
const ProductColors = db.productColors;
const ProductFabrics = db.productFabrics;
const Color = db.color;
const Fabric = db.fabric;

const createCategory = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("Req.body - ", req.body);
    const nameAlreadyExist = await Category.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      console.log("Req.body - ", req.body);
      const createQuery = await Category.create(
        {
          name: req.body.name,
          isFavorite: 0,
          createdAt: new Date(),
          admin_id: req.admin.id,
        },
        { transaction: t }
      );

      const updatedQuery = await Category.findOne({
        where: { id: createQuery.id, admin_id: req.admin.id },
        order: [["id", "Asc"]],
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

const getCategory = async (req, res) => {
  try {
    const query = await Category.findAll({
      attributes: {
        exclude: ["admin_id", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Product,
          required: false,
          as: "productCategory",
          attributes: {
            exclude: [
              "description",
              "sizeAndFit",
              "fabricAndCare",
              "isRecycleBin",
              "isFavorite",
              "isPublished",
              "admin_id",
              "createdAt",
              "updatedAt",
              "productImages_id",
              "category_id",
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

const updateCategory = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const nameAlreadyExist = await Category.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const [updated] = await Category.update(
        {
          name: req.body.name,
          updatedAt: new Date(),
        },
        {
          where: { id: req.params.id, admin_id: req.admin.id },
          transaction: t,
        }
      );

      // Check if any rows were updated
      if (updated) {
        await t.commit();
        // Fetch the updated record
        const query = await Category.findOne({
          where: { id: req.params.id, admin_id: req.admin.id },
        });

        return res.status(200).send({ msg: "success", query });
      } else {
        await t.rollback();
        return res.status(404).send({ msg: "Record not found" });
      }
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await Category.destroy({
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

const categoryIsFavorite = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const isFavoriteStatus = req.body.isFavoriteStatus;
    // console.log("----------categoryIsFavorite ----------------");
    if (isFavoriteStatus === "favoriteIt") {
      // want to favorite it
      const query = await Category.update(
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
      const query = await Category.update(
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
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  categoryIsFavorite,
};
