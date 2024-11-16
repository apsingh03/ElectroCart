// models/ProductProductSizes.js
module.exports = (sequelize, DataTypes) => {
  const PProductSizes = sequelize.define(
    "pProductSizesJunctionTable",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      productSizes_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return PProductSizes;
};
