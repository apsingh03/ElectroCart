module.exports = (sequelize, DataTypes) => {
  const FourImagesBanner = sequelize.define(
    "fourImagesBanner",
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
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isFavorite: {
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

  return FourImagesBanner;
};
