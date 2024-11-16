module.exports = (sequelize, DataTypes) => {
  const ActressCarouselImages = sequelize.define(
    "actressCarouselImages",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
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

  return ActressCarouselImages;
};
