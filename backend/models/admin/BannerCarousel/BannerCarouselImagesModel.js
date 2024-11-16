module.exports = (sequelize, DataTypes) => {
  const BannerCarouselImages = sequelize.define(
    "bannerCarouselImages",
    {
      imageSrc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageAlt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      routeLink: {
        type: DataTypes.STRING,
        allowNull: true,
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

  return BannerCarouselImages;
};
