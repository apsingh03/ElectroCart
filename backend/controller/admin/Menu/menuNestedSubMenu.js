const db = require("../../../models");

// Tables
const ParentMenu = db.parentMenu;
const AdminAuth = db.adminAuth;
const ChildMenu = db.childMenu;
const MenuNestedSubMenu = db.menuNestedSubMenu;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createMenuNestedSubMenu = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const nameAlreadyExist = await MenuNestedSubMenu.findOne({
      where: {
        name: req.body.name,
        admin_id: req.admin.id,
        parentId: req.body.parent_id,
      },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res
        .status(200)
        .send({ msg: "Name Already Exist Under this Parent" });
    } else {
      const createQuery = await MenuNestedSubMenu.create(
        {
          name: req.body.name,
          parentId: req.body.parent_id,
          createdAt: new Date(),
          admin_id: req.admin.id,
          routeLink: req.body.routeLink,
        },
        { transaction: t }
      );

      const findUpdatedQuery = await MenuNestedSubMenu.findOne({
        where: { id: createQuery.id, admin_id: req.admin.id },
        order: [["id", "Asc"]],
        transaction: t,
      });

      await t.commit();
      return res.status(200).send({ msg: "success", query: findUpdatedQuery });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const getMenuNestedSubMenu = async (req, res) => {
  try {
    const query = await MenuNestedSubMenu.findAll({
      where: { admin_id: req.admin.id },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateMenuNestedSubMenu = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const [updated] = await ChildMenu.update(
      {
        ...req.body.updatedData,
        updatedAt: new Date(),
      },
      {
        where: { id: req.params.id, admin_id: req.admin.id },
        transaction: t,
      }
    );

    // Check if any rows were updated
    if (updated) {
      // Fetch the updated record
      const query = await ChildMenu.findOne({
        where: { id: req.params.id, admin_id: req.admin.id },
        transaction: t,
      });
      await t.commit();
      return res.status(200).send({ msg: "success", query });
    } else {
      await t.rollback();
      return res.status(404).send({ msg: "Record not found" });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const deleteMenuNestedSubMenu = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // Pseudocode

    const query = await MenuNestedSubMenu.destroy({
      where: {
        id: req.params?.id,
        admin_id: req.admin.id,
      },
      transaction: t,
    });

    if (query === 0) {
      await t.rollback();
      return res.status(404).send({ msg: "Record not found" });
    }

    // console.log("query Delete - ", query);
    await t.commit();
    return res.status(200).send({ msg: "success" });
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createMenuNestedSubMenu,
  getMenuNestedSubMenu,
  updateMenuNestedSubMenu,
  deleteMenuNestedSubMenu,
};
