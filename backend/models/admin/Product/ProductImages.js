module.exports = (sequelize, DataTypes) => {
  const ProductImages = sequelize.define(
    "productImages",
    {
      url1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url2: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url3: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url4: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url5: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return ProductImages;
};
