const { where } = require("sequelize");
const db = require("../../../models");

// Tables
const AdminAuth = db.adminAuth;

const Fabric = db.fabric;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createFabric = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("Brand Req.body - ", req.body);
    const nameAlreadyExist = await Fabric.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const createQuery = await Fabric.create(
        {
          name: req.body.name,
          createdAt: new Date(),
          admin_id: req.admin.id,
        },
        { transaction: t }
      );

      const updatedQuery = await Fabric.findOne({
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

const getFabric = async (req, res) => {
  try {
    const query = await Fabric.findAll({
      attributes: {
        exclude: ["admin_id", "createdAt", "updatedAt"],
      },
      where: { admin_id: req.admin.id },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateFabric = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const nameAlreadyExist = await Fabric.findOne({
      where: { name: req.body.name, admin_id: req.admin.id },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const [updated] = await Fabric.update(
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
        await t.commit();
        // Fetch the updated record
        const query = await Fabric.findOne({
          where: { id: req.params.id, admin_id: req.admin.id },
        });

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

const deleteFabric = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await Fabric.destroy({
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
  createFabric,
  getFabric,
  updateFabric,
  deleteFabric,
};
