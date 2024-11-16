module.exports = (sequelize, DataTypes) => {
  const PSize = sequelize.define(
    "pSize",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
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

  return PSize;
};
