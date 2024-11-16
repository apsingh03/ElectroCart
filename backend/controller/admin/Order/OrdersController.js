const db = require("../../../models");
const ProductSizesModel = require("../../../models/admin/Sizes/ProductSizesModel");

// Tables
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
const UserCart = db.userCart;
const UserCartItem = db.userCartItem;
const ClientAuth = db.clientAuth;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const getOrders = async (req, res) => {
  try {
    // console.log("-----------getOrders");
    const query = await UserCart.findAll({
      where: {
        status: "SUCCESSFUL",
      },
      // include which user placed this order
      include: [
        {
          model: ClientAuth,
          as: "clientAuthUserCart",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
        // include cartItems according to Cart
        {
          model: UserCartItem,
          as: "userCartUserCartItem",
          attributes: {
            exclude: [
              "user_id",
              "paymentId",
              "status",
              "createdAt",
              "updatedAt",
              "cart_id",
            ],
          },
          where: {
            orderPlacedStatus: true,
          },
          include: {
            model: Product,
            as: "productUserCartItem",
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
              {
                model: ProductColors,
                as: "productColorsProduct",
                attributes: {
                  exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
                },
                include: {
                  model: Color,
                  required: true,
                  as: "productColorsColor",
                  attributes: {
                    exclude: ["admin_id", "createdAt", "updatedAt"],
                  },
                },
              },
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
                    exclude: [
                      "admin_id",
                      "createdAt",
                      "updatedAt",
                      "product_id",
                    ],
                  },
                },
              },
            ],
          },
        },
      ],
      order: [["id", "DESC"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateDeliveryStatus = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { deliveryStatus, cartId } = req.body;

    const [updated] = await UserCart.update(
      {
        deliveryStatus,
        updatedAt: new Date(),
      },
      {
        where: { id: cartId },
        transaction: t,
      }
    );

    if (updated) {
      await t.commit();

      return res.status(200).send({ msg: "success" });
    } else {
      await t.rollback();
      return res.status(404).send({ msg: "Record not found" });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getOrders,
  updateDeliveryStatus,
};
