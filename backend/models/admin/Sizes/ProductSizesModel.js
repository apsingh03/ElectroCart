module.exports = (sequelize, DataTypes) => {
  const ProductSizes = sequelize.define(
    "productSizes",
    {
      mrp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountPercent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return ProductSizes;
};
