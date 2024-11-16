const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: "mysql",
    operatorsAliases: false,
    // logging: true, // Enables logging of SQL queries in the console
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize Connected");
  })
  .catch((error) => {
    console.log("/n /n sequelize Authenticate Error - ", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Client Tables
db.clientAuth = require("./user/ClientAuthModel.js")(sequelize, DataTypes);
// Admin Models
db.adminAuth = require("./admin/AdminAuthModel.js")(sequelize, DataTypes);

db.parentFilter = require("./admin/Filter/ParentFilterModel.js")(
  sequelize,
  DataTypes
);
db.childFilter = require("./admin/Filter/ChildFilterModel.js")(
  sequelize,
  DataTypes
);

db.parentMenu = require("./admin/Menu/ParentMenuModel.js")(
  sequelize,
  DataTypes
);
db.childCategoryBrand =
  require("./admin/CategoryBrand/ChildCategoryBrandModel.js")(
    sequelize,
    DataTypes
  );

db.parentCategoryBrand =
  require("./admin/CategoryBrand/ParentCategoryBrandModel.js")(
    sequelize,
    DataTypes
  );
db.childMenu = require("./admin/Menu/ChildMenuModel.js")(sequelize, DataTypes);

db.productSizes = require("./admin/Sizes/ProductSizesModel.js")(
  sequelize,
  DataTypes
);
db.pSize = require("./admin/Sizes/PSizeModel.js")(sequelize, DataTypes);
db.product = require("./admin/Product/ProductModel.js")(sequelize, DataTypes);
db.productImages = require("./admin/Product/ProductImages.js")(
  sequelize,
  DataTypes
);
// Its a Junction table to get rid from MYSQL foreign key Error
db.PProductSizes =
  require("./admin/Product/ProductProductSizesJunctionTable.js")(
    sequelize,
    DataTypes
  );

db.category = require("./admin/Category/CategoryModel.js")(
  sequelize,
  DataTypes
);

db.color = require("./admin/Color/ColorModel.js")(sequelize, DataTypes);
db.fabric = require("./admin/Brands/FabricModel.js")(sequelize, DataTypes);
db.productColors = require("./admin/Product/ProductColors.js")(
  sequelize,
  DataTypes
);
db.productFabrics = require("./admin/Product/ProductFabrics.js")(
  sequelize,
  DataTypes
);

db.userAddress = require("./user/UserAddressModel.js")(sequelize, DataTypes);
db.userCartItem = require("./user/UserCartItemModel.js")(sequelize, DataTypes);
db.userCart = require("./user/UserCartModel.js")(sequelize, DataTypes);

db.userFavoriteProduct = require("./user/UserFavoriteProductModel.js")(
  sequelize,
  DataTypes
);
// Front end Models
db.actressCarousel = require("./admin/ActressCarousel/ActressCarouselModel.js")(
  sequelize,
  DataTypes
);

db.actressCarouselImages =
  require("./admin/ActressCarousel/ActressCarouselImagesModel.js")(
    sequelize,
    DataTypes
  );

db.bannerCarousel = require("./admin/BannerCarousel/BannerCarouselModel.js")(
  sequelize,
  DataTypes
);

db.bannerCarouselImages =
  require("./admin/BannerCarousel/BannerCarouselImagesModel.js")(
    sequelize,
    DataTypes
  );

db.fourImagesBanner =
  require("./admin/FourImagesBanner/FourImagesBannerModel.js")(
    sequelize,
    DataTypes
  );

db.testimonial = require("./admin/Testimonial/TestimonialModel.js")(
  sequelize,
  DataTypes
);

db.testimonialDetails =
  require("./admin/Testimonial/TestimonialDetailsModel.js")(
    sequelize,
    DataTypes
  );

// --------------------------------- Filter Relations

// childFilter --> parentFilter
db.parentFilter.hasMany(db.childFilter, {
  foreignKey: "parent_id",
  as: "filterChildData",
});

db.childFilter.belongsTo(db.parentFilter, {
  foreignKey: "parent_id",
  as: "filterChildData",
});

// --------------------------------- Menu Relations

// childMenu --> parentMenu
db.parentMenu.hasMany(db.childMenu, {
  foreignKey: "parent_id",
  as: "menuChildData",
});

db.childMenu.belongsTo(db.parentMenu, {
  foreignKey: "parent_id",
  as: "menuChildData",
});

// --------------------------------- CategoryBrand Relations

db.parentCategoryBrand.hasMany(db.childCategoryBrand, {
  foreignKey: "parent_id",
  as: "categoryBrandChildData",
});

db.childCategoryBrand.belongsTo(db.parentCategoryBrand, {
  foreignKey: "parent_id",
  as: "categoryBrandChildData",
});

// --------------------------------- Products

//  productImages -> product
db.product.hasMany(db.productImages, {
  foreignKey: "product_id",
  as: "imageProduct",
});
db.productImages.belongsTo(db.product, {
  foreignKey: "product_id",
  as: "imageProduct",
});

//  product -> productImages
db.productImages.hasMany(db.product, {
  foreignKey: "productImages_id",
  as: "productImage",
});
db.product.belongsTo(db.productImages, {
  foreignKey: "productImages_id",
  as: "productImage",
});

// --------------------------------------------

// Define the relationships
// db.product.belongsToMany(db.productSizes, {
//   through: db.PProductSizes,
//   foreignKey: "product_id",
//   otherKey: "productSizes_id",
//   as: "productSizes",
// });
// db.productSizes.belongsToMany(db.product, {
//   through: db.PProductSizes,
//   foreignKey: "productSizes_id",
//   otherKey: "product_id",
//   as: "products",
// });

// // Sizes relationships
// db.productSizes.belongsTo(db.pSize, {
//   foreignKey: "PSize_id",
//   as: "pSizeProductSizes",
// });
// db.pSize.hasMany(db.productSizes, {
//   foreignKey: "PSize_id",
//   as: "pSizeProductSizes",
// });

// Below correct without using junction table

// product -> productSizes
// db.productSizes.hasMany(db.product, {
//   foreignKey: "productSizes_id",
//   as: "productProductSizes",
// });
// db.product.belongsTo(db.productSizes, {
//   foreignKey: "productSizes_id",
//   as: "productProductSizes",
// });

// PSize -> Product
db.product.hasMany(db.pSize, {
  foreignKey: "product_id",
  as: "pSizeProduct",
});

db.pSize.belongsTo(db.product, {
  foreignKey: "product_id",
  as: "pSizeProduct",
});

// // Product -> category
// db.category.hasMany(db.product, {
//   foreignKey: "category_id",
//   as: "productCategory",
// });

// db.product.belongsTo(db.category, {
//   foreignKey: "category_id",
//   as: "productCategory",
// });

// Product -> parentCategory
db.parentCategoryBrand.hasMany(db.product, {
  foreignKey: "productCategory_id",
  as: "productCategory",
});

db.product.belongsTo(db.parentCategoryBrand, {
  foreignKey: "productCategory_id",
  as: "productCategory",
});

// Product -> childBrand
db.childCategoryBrand.hasMany(db.product, {
  foreignKey: "productBrand_id",
  as: "productBrand",
});

db.product.belongsTo(db.childCategoryBrand, {
  foreignKey: "productBrand_id",
  as: "productBrand",
});

// productColors -> product
db.product.hasMany(db.productColors, {
  foreignKey: "product_id",
  as: "productColorsProduct",
});

db.productColors.belongsTo(db.product, {
  foreignKey: "product_id",
  as: "productColorsProduct",
});

// productColors -> color
db.color.hasMany(db.productColors, {
  foreignKey: "color_id",
  as: "productColorsColor",
});

db.productColors.belongsTo(db.color, {
  foreignKey: "color_id",
  as: "productColorsColor",
});

// productFabrics -> product
db.product.hasMany(db.productFabrics, {
  foreignKey: "product_id",
  as: "productFabricsProduct",
});

db.productFabrics.belongsTo(db.product, {
  foreignKey: "product_id",
  as: "productFabricsProduct",
});

// productFabrics -> fabric
db.fabric.hasMany(db.productFabrics, {
  foreignKey: "fabric_id",
  as: "productFabricsFabric",
});

db.productFabrics.belongsTo(db.fabric, {
  foreignKey: "fabric_id",
  as: "productFabricsFabric",
});

// productSizes to product: One-to-many relationship
db.product.hasMany(db.productSizes, {
  foreignKey: "product_id",
  as: "productSizesProduct",
});
db.productSizes.belongsTo(db.product, {
  foreignKey: "product_id",
  as: "productSizesProduct",
});

// ProductSizes to PSize: Many-to-one relationship
db.pSize.hasMany(db.productSizes, {
  foreignKey: "PSize_id",
  as: "pSizeProductSizes",
});

db.productSizes.belongsTo(db.pSize, {
  foreignKey: "PSize_id",
  as: "pSizeProductSizes",
});

// userAddress -> clientAuth
db.clientAuth.hasMany(db.userAddress, {
  foreignKey: "user_id",
  as: "userAddressClientAuth",
});

db.userAddress.belongsTo(db.clientAuth, {
  foreignKey: "user_id",
  as: "userAddressClientAuth",
});

// userCartItem -> userCart
db.userCart.hasMany(db.userCartItem, {
  foreignKey: "cart_id",
  as: "userCartUserCartItem",
});

db.userCartItem.belongsTo(db.userCart, {
  foreignKey: "cart_id",
  as: "userCartUserCartItem",
});

// userCartItem -> clientAuth
db.clientAuth.hasMany(db.userCartItem, {
  foreignKey: "user_id",
  as: "clientAuthUserCartItem",
});

db.userCartItem.belongsTo(db.clientAuth, {
  foreignKey: "user_id",
  as: "clientAuthUserCartItem",
});

// userCartItem -> product
db.product.hasMany(db.userCartItem, {
  foreignKey: "product_id",
  as: "productUserCartItem",
});

db.userCartItem.belongsTo(db.product, {
  foreignKey: "product_id",
  as: "productUserCartItem",
});

// userCart -> clientAuth
db.clientAuth.hasMany(db.userCart, {
  foreignKey: "user_id",
  as: "clientAuthUserCart",
});

db.userCart.belongsTo(db.clientAuth, {
  foreignKey: "user_id",
  as: "clientAuthUserCart",
});

// userCart -> clientAuth
db.userAddress.hasMany(db.userCart, {
  foreignKey: "address_id",
  as: "userAddressUserCart",
});

db.userCart.belongsTo(db.userAddress, {
  foreignKey: "address_id",
  as: "userAddressUserCart",
});

// userFavoriteProduct -> clientAuth
db.clientAuth.hasMany(db.userFavoriteProduct, {
  foreignKey: "user_id",
  as: "clientAuthUserFavoriteProduct",
});

db.userFavoriteProduct.belongsTo(db.clientAuth, {
  foreignKey: "user_id",
  as: "clientAuthUserFavoriteProduct",
});

// userFavoriteProduct -> clientAuth
db.product.hasMany(db.userFavoriteProduct, {
  foreignKey: "product_id",
  as: "productUserFavoriteProduct",
});

db.userFavoriteProduct.belongsTo(db.product, {
  foreignKey: "product_id",
  as: "productUserFavoriteProduct",
});

// ---------------------------------------------------------------
// -------- FRONT END relations
// --------------------------------------------------------------

db.actressCarousel.hasMany(db.actressCarouselImages, {
  foreignKey: "parent_id",
  as: "actressCarouselActressCarouselImages",
});

db.actressCarouselImages.belongsTo(db.actressCarousel, {
  foreignKey: "parent_id",
  as: "actressCarouselImagesActressCarousel",
});

db.bannerCarousel.hasMany(db.bannerCarouselImages, {
  foreignKey: "parent_id",
  as: "bannerCarouselBannerCarouselImages",
});

db.bannerCarouselImages.belongsTo(db.bannerCarousel, {
  foreignKey: "parent_id",
  as: "bannerCarouselImagesBannerCarousel",
});

db.testimonial.hasMany(db.testimonialDetails, {
  foreignKey: "parent_id",
  as: "testimonialTestimonialDetails",
});

db.testimonialDetails.belongsTo(db.testimonial, {
  foreignKey: "parent_id",
  as: "testimonialDetailsTestimonial",
});

// db.sequelize.sync({ force: false }).then(() => {
//   console.log("------------ Congratulation You are in Sync -------------- ");
// });

module.exports = db;
