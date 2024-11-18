const db = require("../../../models");

// Tables
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Category = db.category;
const ProductSizes = db.productSizes;
const PSize = db.pSize;
const Product = db.product;
const ProductImages = db.productImages;
const ProductColors = db.productColors;
const ProductFabrics = db.productFabrics;
const ParentCategoryBrand = db.parentCategoryBrand;
const Color = db.color;
const Fabric = db.fabric;

const clientDebouncedSearch = async (req, res) => {
  try {
    const searchQuery = req.query.inputQuery;

    const words = searchQuery.split(" ").map((word) => `%${word}%`);

    const query = await Product.findAll({
      where: {
        name: {
          [Sequelize.Op.and]: words.map((word) => ({
            [Sequelize.Op.like]: word,
          })),
        },

        isPublished: true,
        isRecycleBin: false,
      },

      attributes: {
        exclude: [
          "description",
          "sizeAndFit",
          "fabricAndCare",
          "admin_id",
          "createdAt",
          "updatedAt",
          "productImages_id",
          "category_id",
          "isFavorite",
          "isPublished",
          "isRecycleBin",
        ],
      },
      include: [
        {
          model: ParentCategoryBrand,
          as: "productCategory",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt", "isFavorite"],
          },
        },
      ],

      //   order: [["id", "Desc"]],
    });
    // console.log("search - ", req.query.inputQuery);
    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  clientDebouncedSearch,
};
