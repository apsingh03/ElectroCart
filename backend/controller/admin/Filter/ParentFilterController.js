const { where } = require("sequelize");
const db = require("../../../models/");

// Tables
const ParentFilter = db.parentFilter;
const AdminAuth = db.adminAuth;
const ChildFilter = db.childFilter;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createParentFilter = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("Req.body - " , req.body );
    const nameAlreadyExist = await ParentFilter.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      // console.log("nameAlreadyExist");
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      // console.log("Not nameAlreadyExist");
      const createQuery = await ParentFilter.create(
        {
          name: req.body.name,
          createdAt: new Date(),
          admin_id: req.admin.id,
        },
        { transaction: t }
      );
      // console.log("createQuery - ", createQuery);
      const updatedQuery = await ParentFilter.findOne({
        where: { id: createQuery.id, admin_id: req.admin.id },
        order: [["id", "Asc"]],
        transaction: t,
      });
      // console.log("updatedQuery - ", updatedQuery.name);
      await t.commit();
      return res.status(200).send({ msg: "success", query: updatedQuery });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const getParentFilter = async (req, res) => {
  try {
    const query = await ParentFilter.findAll({
      include: [
        {
          model: ChildFilter,
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

const updateParentFilter = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const nameAlreadyExist = await ParentFilter.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const [updated] = await ParentFilter.update(
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
        const query = await ParentFilter.findOne({
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

const deleteParentFilter = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await ParentFilter.destroy({
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
  getParentFilter,
  createParentFilter,
  deleteParentFilter,
  updateParentFilter,
};
