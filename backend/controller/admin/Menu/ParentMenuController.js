const db = require("../../../models");

// Tables
const ParentMenu = db.parentMenu;
const AdminAuth = db.adminAuth;
const ChildMenu = db.childMenu;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createParentMenu = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const nameAlreadyExist = await ParentMenu.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const createQuery = await ParentMenu.create(
        {
          name: req.body.name,
          routeLink: req.body.routeLink,
          createdAt: new Date(),
          admin_id: req.admin.id,
        },
        { transaction: t }
      );

      const updatedQuery = await ParentMenu.findOne({
        where: { id: createQuery.id, admin_id: req.admin.id },
        order: [["id", "Asc"]],
        transaction: t,
      });

      await t.commit();
      return res.status(200).send({ msg: "success", query: updatedQuery });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const getParentMenu = async (req, res) => {
  try {
    // console.log("getParentMenu - ");
    // console.log("admin_id - ", req.admin.id);
    const query = await ParentMenu.findAll({
      include: [
        {
          model: ChildMenu,
          required: false,
          as: "menuChildData",
        },
      ],
      where: { admin_id: req.admin.id },
      order: [["id", "Asc"]],
      // logging: console.log, // Log the generated SQL query
    });

    // console.log("query - ", query);

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateParentMenu = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const [updated] = await ParentMenu.update(
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
      const query = await ParentMenu.findOne({
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

const deleteParentMenu = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await ParentMenu.destroy({
      where: { id: req.params.id, admin_id: req.admin.id },
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
  createParentMenu,
  getParentMenu,
  updateParentMenu,
  deleteParentMenu,
};
