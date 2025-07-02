module.exports = (sequelize, DataTypes) => {
  const MenuNestedSubMenu = sequelize.define(
    "menuNestedSubMenu",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      routeLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "menuNestedSubMenus",
          key: "id",
        },
        onDelete: "CASCADE",
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

  // Self association
  //   onDelete: "CASCADE", - why ?  when you delete a parent, all its children get deleted automatically, by the database,
  // BUT WAIT! This alone won’t work if the actual DB table FK is not set up with ON DELETE CASCADE.
  // You must also update your migration, because Sequelize’s associate does NOT change the actual FK in the DB, it only sets it in the ORM.
  // ✅ ✅ ✅ ✅ Now your DB knows: - “If a parent is deleted, all rows referencing it as parentId get deleted too.”
  MenuNestedSubMenu.hasMany(MenuNestedSubMenu, {
    as: "children",
    foreignKey: "parentId",
    onDelete: "CASCADE",
  });
  MenuNestedSubMenu.belongsTo(MenuNestedSubMenu, {
    as: "parent",
    foreignKey: "parentId",
    onDelete: "CASCADE",
  });

  return MenuNestedSubMenu;
};
