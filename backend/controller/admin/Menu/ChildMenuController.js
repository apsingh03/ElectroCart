const db = require("../../../models");

// Tables
const ParentMenu = db.parentMenu;
const AdminAuth = db.adminAuth;
const ChildMenu = db.childMenu;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createChildMenu = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("Req.body - ", req.body);
    const nameAlreadyExist = await ChildMenu.findOne({
      where: {
        name: req.body.name,
        admin_id: req.admin.id,
        parent_id: req.body.parent_id,
      },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const createQuery = await ChildMenu.create(
        {
          name: req.body.name,
          parent_id: req.body.parent_id,
          createdAt: new Date(),
          admin_id: req.admin.id,
          routeLink: req.body.routeLink,
        },
        { transaction: t }
      );

      const findUpdatedQuery = await ChildMenu.findOne({
        include: [
          {
            model: ParentMenu,
            required: true,
            as: "menuChildData",
          },
        ],

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

const getChildMenu = async (req, res) => {
  try {
    // console.log("------- getChildMenu");
    const query = await ChildMenu.findAll({
      include: [
        {
          model: ParentMenu,
          required: false,
          as: "menuChildData",
        },
      ],

      where: { admin_id: req.admin.id },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateChildMenu = async (req, res) => {
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

const deleteChildMenu = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await ChildMenu.destroy({
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
  createChildMenu,
  getChildMenu,
  updateChildMenu,
  deleteChildMenu,
};
