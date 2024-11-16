const { where } = require("sequelize");
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
const ChildFilter = db.childFilter;
const ParentFilter = db.parentFilter;
const ParentMenu = db.parentMenu;
const ChildMenu = db.childMenu;
const BannerCarousel = db.bannerCarousel;
const BannerCarouselImages = db.bannerCarouselImages;
const ActressCarousel = db.actressCarousel;
const ActressCarouselImages = db.actressCarouselImages;
const Testimonial = db.testimonial;
const TestimonialDetails = db.testimonialDetails;
const FourImagesBanner = db.fourImagesBanner;
const ParentCategoryBrand = db.parentCategoryBrand;
const ChildCategoryBrand = db.childCategoryBrand;

const clientGetCategoryWiseProduct = async (req, res) => {
  try {
    // console.log("-------clientGetCategoryWiseProduct");
    const query = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      where: { isFavorite: true },
      include: [
        {
          model: Product,
          required: true,
          as: "productCategory",
          attributes: {
            exclude: [
              "description",
              "sizeAndFit",
              "fabricAndCare",
              "createdAt",
              "updatedAt",
              "admin_id",
              "productImages_id",
              "category_id",
            ],
          },
          where: { isFavorite: true, isPublished: true, isRecycleBin: false },
          include: [
            {
              model: ProductImages,
              as: "productImage",
              attributes: {
                exclude: ["admin_id", "product_id", "url3", "url4", "url5"],
              },
            },
            // {
            //   model: ProductColors,
            //   as: "productColorsProduct",
            //   include: [
            //     {
            //       model: Color,
            //       required: true,
            //       as: "productColorsColor",
            //     },
            //   ],
            // },
            // {
            //   model: ProductFabrics,
            //   as: "productFabricsProduct",
            //   include: [
            //     {
            //       model: Fabric,
            //       required: true,
            //       as: "productFabricsFabric",
            //     },
            //   ],
            // },
            {
              model: ProductSizes,
              as: "productSizesProduct",
              attributes: {
                exclude: [
                  "admin_id",
                  "createdAt",
                  "updatedAt",
                  "product_id",
                  "PSize_id",
                ],
              },
              // include: [
              //   {
              //     model: PSize,
              //     required: true,
              //     as: "pSizeProductSizes",
              //   },
              // ],
            },
          ],
        },
      ],
      order: [["id", "ASC"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientAllListedProducts = async (req, res) => {
  try {
    // console.log("-------- clientAllListedProducts");
    const query = await Product.findAll({
      attributes: {
        exclude: [
          "description",
          "sizeAndFit",
          "fabricAndCare",
          "admin_id",
          "createdAt",
          "updatedAt",
          "productImages_id",
          // "category_id",
          "isFavorite",
        ],
      },
      include: [
        {
          model: ProductImages,
          as: "productImage",
          attributes: {
            exclude: ["url3", "url4", "url5", "admin_id", "product_id"],
          },
        },
        // {
        //   model: Category,
        //   as: "productCategory",
        //   attributes: {
        //     exclude: ["admin_id", "createdAt", "updatedAt", "isFavorite"],
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
        // {
        //   model: ProductFabrics,
        //   as: "productFabricsProduct",
        //   attributes: {
        //     exclude: ["url3", "url4", "url5", "admin_id", "product_id"],
        //   },
        //   include: {
        //     model: Fabric,
        //     required: true,
        //     as: "productFabricsFabric",
        //   },
        // },

        {
          model: ProductSizes,
          as: "productSizesProduct",
          attributes: {
            exclude: ["createdAt", "updatedAt", "admin_id", "product_id"],
          },
          include: {
            model: PSize,
            required: true,
            as: "pSizeProductSizes",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "admin_id",
                "product_id",
                "qty",
              ],
            },
          },
        },
      ],
      where: { isPublished: true, isRecycleBin: false },
      order: [["id", "Desc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientShowFilteredProducts = async (req, res) => {
  try {
    console.log("clientShowFilteredProducts ------------------------------- ");
    const categoryNames = req.query.category || [];
    const brandNames = req.query.brand || [];
    const colorNames = req.query.color || [];
    const sizeNames = req.query.size || [];
    const greaterPrice = req.query.price?.gte || null;
    const lowerPrice = req.query.price?.lte || null;

    // console.log("categoryNames - ", categoryNames);
    // console.log("colorNames - ", colorNames);
    // console.log("sizeNames - ", sizeNames);

    const include = [
      {
        model: ProductImages,
        as: "productImage",
        attributes: {
          exclude: ["url3", "url4", "url5", "admin_id", "product_id"],
        },
      },
    ];

    if (categoryNames.length > 0) {
      include.push({
        model: ParentCategoryBrand,
        as: "productCategory",
        required: true,
        where: { name: categoryNames },
        attributes: {
          exclude: ["admin_id", "createdAt", "updatedAt", "isFavorite"],
        },
      });
    } else {
      include.push({
        model: ParentCategoryBrand,
        as: "productCategory",
        attributes: {
          exclude: ["admin_id", "createdAt", "updatedAt", "isFavorite"],
        },
      });
    }

    if (brandNames.length > 0) {
      include.push({
        model: ChildCategoryBrand,
        as: "productBrand",
        required: true,
        where: { name: brandNames },
        attributes: {
          exclude: ["admin_id", "createdAt", "updatedAt", "isFavorite"],
        },
      });
    } else {
      include.push({
        model: ChildCategoryBrand,
        as: "productBrand",
        attributes: {
          exclude: ["admin_id", "createdAt", "updatedAt", "isFavorite"],
        },
      });
    }

    if (colorNames.length > 0) {
      include.push({
        model: ProductColors,
        as: "productColorsProduct",
        required: true,
        attributes: {
          exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        },
        include: {
          model: Color,
          as: "productColorsColor",
          where: { name: colorNames },
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt"],
          },
        },
      });
    } else {
      include.push({
        model: ProductColors,
        as: "productColorsProduct",
        attributes: {
          exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        },
        include: {
          model: Color,
          as: "productColorsColor",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt"],
          },
        },
      });
    }

    if (sizeNames.length > 0) {
      // console.log("Including sizes");
      include.push({
        model: ProductSizes,
        as: "productSizesProduct",
        required: true,
        attributes: {
          exclude: ["createdAt", "updatedAt", "admin_id", "product_id"],
        },
        include: {
          model: PSize,
          as: "pSizeProductSizes",
          where: { name: sizeNames },
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "admin_id",
              "product_id",
              "qty",
            ],
          },
        },
      });
    } else {
      include.push({
        model: ProductSizes,
        as: "productSizesProduct",
        attributes: {
          exclude: ["createdAt", "updatedAt", "admin_id", "product_id"],
        },
        include: {
          model: PSize,
          as: "pSizeProductSizes",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "admin_id",
              "product_id",
              "qty",
            ],
          },
        },
      });
    }

    if (
      greaterPrice !== null &&
      lowerPrice !== null &&
      lowerPrice > greaterPrice
    ) {
      console.log("Filtering with Price");
      include.push({
        model: ProductSizes,
        as: "productSizesProduct",
        required: true,
        where: {
          mrp: {
            [Sequelize.Op.gt]: greaterPrice, // Greater than or equal to
            [Sequelize.Op.lt]: lowerPrice, // Less than or equal to
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "admin_id", "product_id"],
        },
        include: {
          model: PSize,
          as: "pSizeProductSizes",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "admin_id",
              "product_id",
              "qty",
            ],
          },
        },
      });
    }

    const query = await Product.findAll({
      attributes: {
        exclude: [
          "description",

          "admin_id",
          "createdAt",
          "updatedAt",
          "productImages_id",
          // "category_id",
       
        ],
      },
      include,
      where: { isPublished: true, isRecycleBin: false },
      order: [["id", "Desc"]],
    });

    // console.log("----------------- END clientShowFilteredProducts");

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const query = await Product.findOne({
      attributes: {
        exclude: [
          "admin_id",
          "createdAt",
          "updatedAt",
          "productImages_id",
          "category_id",
        ],
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
            exclude: ["createdAt", "updatedAt", "admin_id", "product_id", ""],
          },
          include: {
            model: PSize,
            required: true,
            as: "pSizeProductSizes",
            attributes: {
              exclude: ["createdAt", "updatedAt", "admin_id", "product_id"],
            },
          },
        },
      ],
      where: { id: productId },
      order: [["id", "Desc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetProductFilters = async (req, res) => {
  try {
    const query = await ParentFilter.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      include: [
        {
          model: ChildFilter,
          required: false,
          as: "filterChildData",
          attributes: {
            exclude: ["createdAt", "updatedAt", "admin_id", "parent_id"],
          },
        },
      ],
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetMenuAsync = async (req, res) => {
  try {
    const query = await ParentMenu.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      include: [
        {
          model: ChildMenu,
          required: true,
          as: "menuChildData",
          attributes: {
            exclude: ["createdAt", "updatedAt", "admin_id", "parent_id"],
          },
        },
      ],
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetSizesFilters = async (req, res) => {
  try {
    const query = await PSize.findAll({
      // attributes: [
      //   "name",
      //   [Sequelize.fn("SUM", Sequelize.col("qty")), "totalQty"],
      // ],
      group: ["name"],
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetBannerCarousel = async (req, res) => {
  try {
    const query = await BannerCarousel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      where: { isFavorite: true },
      include: {
        model: BannerCarouselImages,
        as: "bannerCarouselBannerCarouselImages",
        attributes: {
          exclude: ["createdAt", "updatedAt", "admin_id", "parent_id"],
        },
        where: { isFavorite: true },
      },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetActressCarousel = async (req, res) => {
  try {
    const query = await ActressCarousel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      where: { isFavorite: true },
      include: {
        model: ActressCarouselImages,
        as: "actressCarouselActressCarouselImages",
        attributes: {
          exclude: ["createdAt", "updatedAt", "admin_id", "parent_id"],
        },
        where: { isFavorite: true },
      },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetTestimonial = async (req, res) => {
  try {
    const query = await Testimonial.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      where: { isFavorite: true },
      include: {
        model: TestimonialDetails,
        as: "testimonialTestimonialDetails",
        attributes: {
          exclude: ["createdAt", "updatedAt", "admin_id", "parent_id"],
        },
        where: { isFavorite: true },
      },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetFourBannerImages = async (req, res) => {
  try {
    const query = await FourImagesBanner.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      where: { isFavorite: true },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  clientGetCategoryWiseProduct,
  clientAllListedProducts,
  clientGetSingleProduct,
  clientGetProductFilters,
  clientGetMenuAsync,
  clientGetSizesFilters,
  clientShowFilteredProducts,
  clientGetBannerCarousel,
  clientGetActressCarousel,
  clientGetTestimonial,
  clientGetFourBannerImages,
};
