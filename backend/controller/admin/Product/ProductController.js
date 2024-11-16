const db = require("../../../models");
const ProductSizesModel = require("../../../models/admin/Sizes/ProductSizesModel");

// Tables
const AdminAuth = db.adminAuth;

const ProductSizes = db.productSizes;
const PSize = db.pSize;
const Product = db.product;
const ProductImages = db.productImages;
const ParentCategoryBrand = db.parentCategoryBrand;
const ChildCategoryBrand = db.childCategoryBrand;
const ProductColors = db.productColors;
const ProductFabrics = db.productFabrics;
const Color = db.color;
const Fabric = db.fabric;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productTitle = req.body.productTitle;
    const productCategory = req.body.productCategory;
    const productCategoryBrand = req.body.productCategoryBrand;
    const productColorArray = req.body.productColor;
    const productDesc = req.body.productDesc;
    const productSizeArrayObject = req.body.productSize;
    const productImagesArray = req.body.productImages;

    const productTitleAlreadyExist = await Product.findOne({
      where: { name: productTitle, admin_id: req.admin.id },
      transaction: t,
    });

    if (productTitleAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Product Title Already Exist" });
    } else {
      // console.log("--------- createProduct", req.body);
      const productImageQuery = await ProductImages.create(
        {
          url1: productImagesArray[0],
          url2: productImagesArray[1],
          url3: productImagesArray[2],
          url4: productImagesArray[3],
          url5: productImagesArray[4],
          admin_id: req.admin.id,
          product_id: null,
        },
        { transaction: t }
      );
      // console.log("--------- productImageQuery");
      // Insert into Product table
      const productQuery = await Product.create(
        {
          name: productTitle,
          description: productDesc,

          isRecycleBin: false,
          isPublished: false,
          isFavorite: false,
          admin_id: req.admin.id,
          createdAt: new Date(),
          productCategory_id: productCategory,
          productImages_id: productImageQuery.id,
          productBrand_id: productCategoryBrand,
        },
        { transaction: t }
      );

      const productId = productQuery.id;
      // console.log("--------- productQuery");

      // update product id on ProductImages
      await ProductImages.update(
        {
          product_id: productId,
        },
        {
          where: { id: productImageQuery.id, admin_id: req.admin.id },
          transaction: t,
        }
      );
      // console.log("--------- ProductImages.update", hjgj);
      // Insert into pSizes and productSizes tables
      for (const size of productSizeArrayObject) {
        const pSizeQuery = await PSize.create(
          {
            name: size.sizeName,
            qty: size.qty,
            admin_id: req.admin.id,
            product_id: productId,
            createdAt: new Date(),
          },
          { transaction: t }
        );

        await ProductSizes.create(
          {
            mrp: size.mrp,
            discountPercent: size.discountPercent,
            admin_id: req.admin.id,
            product_id: productId,
            PSize_id: pSizeQuery.id,
            createdAt: new Date(),
          },
          { transaction: t }
        );
      }
      // console.log("--------- productSizeArrayObject.create");
      // Insert into productFabrics table
      // for (const fabricId of productFabricsArray) {
      //   await ProductFabrics.create(
      //     {
      //       admin_id: req.admin.id,
      //       product_id: productId,
      //       fabric_id: fabricId,
      //       createdAt: new Date(),
      //     },
      //     { transaction: t }
      //   );
      // }
      // console.log("--------- productFabricsArray.create");
      // Insert into productColors table
      for (const colorId of productColorArray) {
        await ProductColors.create(
          {
            admin_id: req.admin.id,
            product_id: productId,
            color_id: colorId,
            createdAt: new Date(),
          },
          { transaction: t }
        );
      }
      // console.log("--------- productColorArray.create");

      const productFetchQuery = await Product.findOne({
        include: [
          {
            model: ProductImages,
            as: "productImage",
          },
          // {
          //   model: Category,
          //   as: "productCategory",
          // },
          {
            model: ProductColors,
            as: "productColorsProduct",
            include: {
              model: Color,
              required: true,
              as: "productColorsColor",
            },
          },
          // {
          //   model: ProductFabrics,
          //   as: "productFabricsProduct",
          //   include: {
          //     model: Fabric,
          //     required: true,
          //     as: "productFabricsFabric",
          //   },
          // },
          {
            model: ProductSizes,
            as: "productSizesProduct",
            include: {
              model: PSize,
              required: true,
              as: "pSizeProductSizes",
            },
          },
        ],
        where: { admin_id: req.admin.id, id: productId },
      });

      // Commit transaction
      await t.commit();
      res
        .status(201)
        .send({ msg: "Product created", query: productFetchQuery });
    }
  } catch (error) {
    await t.rollback();
    console.error("Transaction failed and rolled back:", error);
    return res.status(500).send({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const query = await Product.findAll({
      attributes: {
        exclude: ["description", "productImages_id"],
      },
      include: [
        {
          model: ProductImages,
          as: "productImage",
          attributes: {
            exclude: ["admin_id", "product_id"],
          },
        },
        {
          model: ParentCategoryBrand,
          as: "productCategory",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt"],
          },
        },
        {
          model: ChildCategoryBrand,
          as: "productBrand",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt"],
          },
        },
        {
          model: ProductColors,
          as: "productColorsProduct",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt", "product_id", ""],
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
        // {
        //   model: ProductFabrics,
        //   as: "productFabricsProduct",
        //   attributes: {
        //     exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        //   },
        //   include: {
        //     model: Fabric,
        //     required: true,
        //     as: "productFabricsFabric",
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
      where: { admin_id: req.admin.id },
      order: [["id", "Desc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const isProductTitleExist = async (req, res) => {
  try {
    // console.log("----------------------- isProductTitleExist");
    const productTitleExist = await Product.findOne({
      where: { name: req.params.productTitle, admin_id: req.admin.id },
    });

    if (productTitleExist) {
      return res.status(200).send({ msg: "Product title Exist" });
    } else {
      return res.status(200).send({ msg: "Product title Doesn't Exist" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const nameAlreadyExist = await ProductSizes.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const [updated] = await ProductSizes.update(
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
        const query = await ProductSizes.findOne({
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

const deleteProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await ProductSizes.destroy({
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

const productIsPublished = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const isPublishStatus = req.body.isPublishStatus;

    if (isPublishStatus === "PublishIt") {
      // want to publish it
      const query = await Product.update(
        {
          isPublished: 1,
        },
        { where: { id: productId, admin_id: req.admin.id }, transaction: t }
      );
      await t.commit();
      return res.status(200).send({ msg: "success", query: 1 });
    }

    if (isPublishStatus === "unPublishedIt") {
      // want to unpublish it
      const query = await Product.update(
        {
          isPublished: 0,
        },
        { where: { id: productId, admin_id: req.admin.id }, transaction: t }
      );
      await t.commit();
      return res.status(200).send({ msg: "success", query: 1 });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const productIsFavorite = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const isFavoriteStatus = req.body.isFavoriteStatus;

    // console.log("-----------productIsFavorite ----------");
    // console.log("productId - ", productId);
    // console.log("isFavoriteStatus - ", isFavoriteStatus);

    if (isFavoriteStatus === "favoriteIt") {
      // want to favorite it
      const query = await Product.update(
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
      const query = await Product.update(
        {
          isFavorite: 0,
        },
        { where: { id: productId, admin_id: req.admin.id }, transaction: t }
      );
      await t.commit();
      return res.status(200).send({ msg: "success", query: 1 });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const productIsRecycleBin = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const productId = req.params.id;
    const isRecycleStatus = req.body.isRecycleStatus;

    // console.log("-----------isRecycleStatus ----------");
    // console.log("productId - ", productId);
    // console.log("isRecycleStatus - ", isRecycleStatus);

    if (isRecycleStatus === "moveIt") {
      // want to favorite it
      await Product.update(
        {
          isRecycleBin: 1,
        },
        { where: { id: productId, admin_id: req.admin.id }, transaction: t }
      );
      await t.commit();
      return res.status(200).send({ msg: "success" });
    }

    if (isRecycleStatus === "restoreIt") {
      // want to un favorite it
      await Product.update(
        {
          isRecycleBin: 0,
        },
        { where: { id: productId, admin_id: req.admin.id }, transaction: t }
      );
      await t.commit();
      return res.status(200).send({ msg: "success" });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  productIsPublished,
  productIsFavorite,
  productIsRecycleBin,
  isProductTitleExist,
};
