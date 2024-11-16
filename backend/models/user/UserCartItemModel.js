module.exports = (sequelize, DataTypes) => {
  const UserCartItem = sequelize.define(
    "userCartItem",
    {
      qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      color_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      PSize_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      orderPlacedStatus: {
        type: DataTypes.BOOLEAN,
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

  return UserCartItem;
};
