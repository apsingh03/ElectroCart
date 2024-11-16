module.exports = (sequelize, DataTypes) => {
  const UserFavoriteProducts = sequelize.define(
    "userFavoriteProducts",
    {
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

  return UserFavoriteProducts;
};
