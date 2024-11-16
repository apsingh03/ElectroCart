module.exports = (sequelize, DataTypes) => {
  const TestimonialDetails = sequelize.define(
    "testimonialDetails",
    {
      imageSrc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageAlt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerMsg: {
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

  return TestimonialDetails;
};
