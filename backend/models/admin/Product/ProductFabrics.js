module.exports = (sequelize, DataTypes) => {
  const ProductFabrics = sequelize.define(
    "productFabrics",
    {
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

  return ProductFabrics;
};
