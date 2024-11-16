const db = require("../../../models/");

// Tables
const ParentFilter = db.parentFilter;
const AdminAuth = db.adminAuth;
const ChildFilter = db.childFilter;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createChildFilter = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("Req.body - ", req.body);
    const nameAlreadyExist = await ChildFilter.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const createQuery = await ChildFilter.create(
        {
          name: req.body.name,
          parent_id: req.body.parent_id,
          createdAt: new Date(),
          admin_id: req.admin.id,
        },
        { transaction: t }
      );

      const findUpdatedQuery = await ChildFilter.findOne({
        include: [
          {
            model: ParentFilter,
            required: true,
            as: "filterChildData",
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

const getChildFilter = async (req, res) => {
  try {
    const query = await ChildFilter.findAll({
      include: [
        {
          model: ParentFilter,
          required: false,
          as: "filterChildData",
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

const updateChildFilter = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const nameAlreadyExist = await ChildFilter.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const [updated] = await ChildFilter.update(
        {
          name: req.body.name,
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
        const query = await ChildFilter.findOne({
          where: { id: req.params.id, admin_id: req.admin.id },
          transaction: t,
        });
        await t.commit();
        return res.status(200).send({ msg: "success", query });
      } else {
        await t.rollback();
        return res.status(404).send({ msg: "Record not found" });
      }
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const deleteChildFilter = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await ChildFilter.destroy({
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
  createChildFilter,
  getChildFilter,
  updateChildFilter,
  deleteChildFilter,
};
