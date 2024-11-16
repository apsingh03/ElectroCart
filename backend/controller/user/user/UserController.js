const { where } = require("sequelize");
const db = require("../../../models");

// Tables

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const AdminAuth = db.adminAuth;
const ClientAuth = db.clientAuth;
const Category = db.category;
const ProductSizes = db.productSizes;
const PSize = db.pSize;
const Product = db.product;
const ProductImages = db.productImages;
const ProductColors = db.productColors;
const ProductFabrics = db.productFabrics;
const Color = db.color;
const Fabric = db.fabric;
const UserCart = db.userCart;
const UserCartItem = db.userCartItem;
const UserFavoriteProduct = db.userFavoriteProduct;

const getUserInfo = async (req, res) => {
  try {
    const query = await ClientAuth.findAll({
      where: {
        id: req.user.id,
      },

      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },

      include: {
        model: UserCart,
        as: "clientAuthUserCart",
        where: { status: "SUCCESSFUL" },
        include: {
          model: UserCartItem,
          as: "userCartUserCartItem",
          attributes: {
            exclude: ["user_id", "createdAt", "updatedAt"],
          },
          where: { orderPlacedStatus: true },
        },

        // where: {
        //   orderPlacedStatus: false,
        // },
        // include: {
        //   model: Product,
        //   as: "productUserCartItem",
        //   attributes: {
        //     exclude: [
        //       "description",
        //       "sizeAndFit",
        //       "fabricAndCare",
        //       "productImages_id",
        //       "category_id",
        //       "isRecycleBin",
        //       "isFavorite",
        //       "isPublished",
        //       "admin_id",
        //       "createdAt",
        //       "updatedAt",
        //     ],
        //   },
        //   include: [
        //     {
        //       model: ProductImages,
        //       as: "productImage",
        //       attributes: {
        //         exclude: [
        //           "admin_id",
        //           "product_id",
        //           "url2",
        //           "url3",
        //           "url4",
        //           "url5",
        //         ],
        //       },
        //     },
        //     // {
        //     //   model: Category,
        //     //   as: "productCategory",
        //     //   attributes: {
        //     //     exclude: ["admin_id", "createdAt", "updatedAt"],
        //     //   },
        //     // },
        //     {
        //       model: ProductColors,
        //       as: "productColorsProduct",
        //       attributes: {
        //         exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        //       },
        //       include: {
        //         model: Color,
        //         required: true,
        //         as: "productColorsColor",
        //         attributes: {
        //           exclude: ["admin_id", "createdAt", "updatedAt"],
        //         },
        //       },
        //     },
        //     {
        //       model: ProductSizes,
        //       as: "productSizesProduct",
        //       attributes: {
        //         exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        //       },
        //       include: {
        //         model: PSize,
        //         required: true,
        //         as: "pSizeProductSizes",
        //         attributes: {
        //           exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        //         },
        //       },
        //     },
        //   ],
        // },
      },
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createUserFavoriteProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { product_id } = req.body;
    // console.log("Req.body - ", req.body);
    const alreadyExist = await UserFavoriteProduct.findOne({
      where: { product_id, user_id: req.user.id },
      transaction: t,
    });

    if (alreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Product Already Exist" });
    } else {
      // console.log("Req.body - ", req.body);
      await UserFavoriteProduct.create(
        {
          product_id,
          createdAt: new Date(),
          user_id: req.user.id,
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).send({ msg: "success" });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const getUserFavoriteProduct = async (req, res) => {
  try {
    const query = await UserFavoriteProduct.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Product,
        as: "productUserFavoriteProduct",
        attributes: {
          exclude: [
            "description",
            "sizeAndFit",
            "fabricAndCare",
            "productImages_id",
            "category_id",
            "isRecycleBin",
            "isFavorite",
            "isPublished",
            "admin_id",
            "createdAt",
            "updatedAt",
          ],
        },
        include: [
          {
            model: ProductImages,
            as: "productImage",
            attributes: {
              exclude: [
                "admin_id",
                "product_id",
                "url2",
                "url3",
                "url4",
                "url5",
              ],
            },
          },
          // {
          //   model: Category,
          //   as: "productCategory",
          //   attributes: {
          //     exclude: ["admin_id", "createdAt", "updatedAt"],
          //   },
          // },
          // {
          //   model: ProductColors,
          //   as: "productColorsProduct",
          //   attributes: {
          //     exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
          //   },
          //   include: {
          //     model: Color,
          //     required: true,
          //     as: "productColorsColor",
          //     attributes: {
          //       exclude: ["admin_id", "createdAt", "updatedAt"],
          //     },
          //   },
          // },
          {
            model: ProductSizes,
            as: "productSizesProduct",
            attributes: {
              exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
            },
            include: {
              model: PSize,
              required: true,
              as: "pSizeProductSizes",
              attributes: {
                exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
              },
            },
          },
        ],
      },
      where: { user_id: req.user.id },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteUserFavoriteProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await UserFavoriteProduct.destroy({
      where: { id: req.params.id, user_id: req.user.id },
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

module.exports = {
  getUserInfo,
  createUserFavoriteProduct,
  getUserFavoriteProduct,
  deleteUserFavoriteProduct,
};
