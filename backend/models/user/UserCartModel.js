module.exports = (sequelize, DataTypes) => {
  const UserCart = sequelize.define(
    "userCart",
    {
      cartAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      paymentMode: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      orderId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deliveryStatus: {
        type: DataTypes.STRING,
        allowNull: true,
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

  return UserCart;
};
