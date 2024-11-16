const db = require("../../../models");

// Tables
const ParentCategoryBrand = db.parentCategoryBrand;
const AdminAuth = db.adminAuth;
const ChildCategoryBrand = db.childCategoryBrand;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const createChildCategoryBrand = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("Req.body - ", req.body);
    const nameAlreadyExist = await ChildCategoryBrand.findOne({
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
      const createQuery = await ChildCategoryBrand.create(
        {
          name: req.body.name,
          parent_id: req.body.parent_id,
          createdAt: new Date(),
          admin_id: req.admin.id,
        },
        { transaction: t }
      );

      const findUpdatedQuery = await ChildCategoryBrand.findOne({
        include: [
          {
            model: ParentCategoryBrand,
            required: true,
            as: "categoryBrandChildData",
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

const getChildCategoryBrand = async (req, res) => {
  try {
    // console.log("------- getChildMenu");
    const query = await ChildCategoryBrand.findAll({
      include: [
        {
          model: ParentCategoryBrand,
          required: true,
          as: "categoryBrandChildData",
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

const updateChildCategoryBrand = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("updateChildCategoryBrand Req.body ", req.body);
    const nameAlreadyExist = await ChildCategoryBrand.findOne({
      where: {
        name: req.body.name,
        admin_id: req.admin.id,
        parent_id: req.body.parentId,
      },
      transaction: t,
    });

    if (nameAlreadyExist) {
      await t.rollback();
      return res.status(200).send({ msg: "Name Already Exist" });
    } else {
      const [updated] = await ChildCategoryBrand.update(
        {
          name: req.body.name,
          updatedAt: new Date(),
        },
        {
          where: {
            id: req.params.id,
            admin_id: req.admin.id,
            // parent_id: req.parentId,
          },
          transaction: t,
        }
      );

      // Check if any rows were updated
      if (updated) {
        // Fetch the updated record
        const query = await ChildCategoryBrand.findOne({
          where: [{ id: req.params.id }, { admin_id: req.admin.id }],
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
    // console.log("Eror - ", error.message);
    return res.status(500).send({ error: error.message });
  }
};

const deleteChildCategoryBrand = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const query = await ChildCategoryBrand.destroy({
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

const getChildCategoryBrandByCategoryId = async (req, res) => {
  try {
    console.log("------- getChildCategoryBrandByCategoryId", req.params.id);
    const query = await ChildCategoryBrand.findAll({
      // include: [
      //   {
      //     model: ParentCategoryBrand,
      //     required: true,
      //     as: "categoryBrandChildData",
      //   },
      // ],

      where: { admin_id: req.admin.id, parent_id: req.params.id },
      order: [["id", "Asc"]],
    });

    // console.log("query - ", query);
    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createChildCategoryBrand,
  getChildCategoryBrand,
  updateChildCategoryBrand,
  deleteChildCategoryBrand,
  getChildCategoryBrandByCategoryId,
};
