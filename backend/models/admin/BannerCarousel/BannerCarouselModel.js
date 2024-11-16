module.exports = (sequelize, DataTypes) => {
  const BannerCarousel = sequelize.define(
    "bannerCarousel",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      animation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      timer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      width: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      objectFit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isFavorite: {
        type: DataTypes.BOOLEAN,
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

  return BannerCarousel;
};
