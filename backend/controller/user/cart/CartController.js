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
const UserCart = db.userCart;
const UserCartItem = db.userCartItem;

const createUserCart = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.body.productId;

    const cartAlreadyExist = await UserCart.findOne({
      where: { status: "pending", user_id: req.user.id },
      transaction: t,
    });

    if (cartAlreadyExist) {
      // cart already exist for user just u need to update cartAmount , addressId , etc

      const userCartItemAlreadyExist = await UserCartItem.findOne({
        where: {
          cart_id: cartAlreadyExist.id,
          orderPlacedStatus: false,
          user_id: req.user.id,
          product_id: productId,
        },
        transaction: t,
      });

      if (userCartItemAlreadyExist) {
        await t.rollback();
        return res.status(200).send({ msg: "Item Already Exist" });
      }

      await UserCartItem.create(
        {
          qty: 1,
          orderPlacedStatus: false,
          cart_id: cartAlreadyExist.id,
          user_id: req.user.id,
          product_id: productId,
          createdAt: new Date(),
          color_id: req.body.color_id,
          PSize_id: req.body.PSize_id,
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).send({ msg: "success" });
    } else {
      const userCartQuery = await UserCart.create(
        {
          cartAmount: null,
          paymentMode: null,
          orderId: null,
          paymentId: null,
          status: "pending",
          createdAt: new Date(),
          user_id: req.user.id,
          address_id: null,
        },
        { transaction: t }
      );

      await UserCartItem.create(
        {
          qty: 1,
          orderPlacedStatus: false,
          cart_id: userCartQuery.id,
          user_id: req.user.id,
          product_id: productId,
          createdAt: new Date(),
          color_id: req.body.color_id,
          PSize_id: req.body.PSize_id,
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

const getUserCart = async (req, res) => {
  try {
    const query = await UserCart.findAll({
      where: {
        status: "pending",
        user_id: req.user.id,
      },

      attributes: {
        exclude: [
          "paymentMode",
          "orderId",
          "paymentId",
          "status",
          "createdAt",
          "updatedAt",
          "user_id",
          "address_id",
          "cartAmount",
        ],
      },
      include: {
        model: UserCartItem,
        as: "userCartUserCartItem",
        attributes: {
          exclude: ["user_id", "paymentId", "status", "createdAt", "updatedAt"],
        },
        where: {
          orderPlacedStatus: false,
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
                  exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
                },
              },
            },
          ],
        },
      },
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateUserCartQty = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const cartItem_id = req.params.cartItem_id;
    const qtyMessage = req.body.qtyMessage;

    const findCartItemQuery = await UserCartItem.findOne({
      where: { id: cartItem_id },
    });

    if (qtyMessage === "Increase") {
      const [updated] = await UserCartItem.update(
        {
          qty: findCartItemQuery.qty + 1,
        },
        {
          where: { id: cartItem_id },
          transaction: t,
        }
      );

      // Check if any rows were updated
      if (updated) {
        await t.commit();
        return res.status(200).send({ msg: "success" });
      } else {
        await t.rollback();
        return res.status(404).send({ msg: "Record not found" });
      }
    }

    if (qtyMessage === "Decrease") {
      const [updated] = await UserCartItem.update(
        {
          qty: findCartItemQuery.qty - 1,
        },
        {
          where: { id: cartItem_id },
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
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const deleteUserCart = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("--------- deleteUserCart");

    // console.log("req.params.cart_id - ", req.params.cart_id);
    // console.log("req.params.cartItemId - ", req.params.cartItem_id);

    const cart_id = req.params.cart_id;
    const cartItem_id = req.params.cartItem_id;

    const userCartItemQuery = await UserCartItem.findAll({
      where: {
        cart_id: cart_id,
        user_id: req.user.id,
        orderPlacedStatus: false,
      },
    });
    // console.log("length ", userCartItemQuery.length);
    if (userCartItemQuery.length >= 2) {
      // console.log("----------- IF ");
      // just delete cartItem data
      const query = await UserCartItem.destroy({
        where: {
          id: cartItem_id,
          cart_id: cart_id,
          user_id: req.user.id,
          orderPlacedStatus: false,
        },
        transaction: t,
      });
      if (query === 0) {
        await t.rollback();
        return res.status(404).send({ msg: "Record not found" });
      }
    } else {
      // console.log("----------- ELSE ");
      // only 1 data in cart Item so we need to delete from cartItem and userCart

      const userCartItemQuery = await UserCartItem.destroy({
        where: {
          id: cartItem_id,
          cart_id: cart_id,
          user_id: req.user.id,
          orderPlacedStatus: false,
        },
        transaction: t,
      });

      const userCartQuery = await UserCart.destroy({
        where: {
          id: cart_id,
          status: "pending",
        },
        transaction: t,
      });

      if (userCartQuery === 0 && userCartItemQuery === 0) {
        // console.log("Record not found");
        await t.rollback();
        return res.status(404).send({ msg: "Record not found" });
      }
    }

    await t.commit();
    return res.status(200).send({ msg: "success" });
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createUserCart,
  getUserCart,
  updateUserCartQty,
  deleteUserCart,
};
