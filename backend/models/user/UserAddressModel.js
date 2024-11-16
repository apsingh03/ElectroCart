module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define(
    "userAddress",
    {
      receiverName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
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

  return UserAddress;
};
