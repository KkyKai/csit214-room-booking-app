const db = require("../db/models");
const Op = db.Sequelize.Op;
const { userAdmin, Student, Staff } = db;

module.exports = {
  findAll: async (req, res) => {
    try {
      const userAdminDetails = req.query.userAdminDetails;
      /*         var condition = userAdminDetails ? {
                userAdminDetails: {
                    [Op.like]: `%${email}%`,
                    [Op.like]: `%${password}%`,
                    [Op.like]: `%${suspended}%`,
                    [Op.like]: `%${lastLoggedIn}%`,
                    [Op.like]: `%${lastLoggedOut}%`,
                },
            } :
            userAdmin.findAll({ where: condition })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error Occured.",
                });
            }); */

      const students = await Student.findAll().map((student) => {
        return { ...student, type: "student" };
      });

      const staffs = await Staff.findAll().map((staff) => {
        return { ...staff, type: "staff" };
      });

      res.send([...students, ...staffs]);
    } catch (err) {
      res.status(500).send({
        message: `Error 500 Updating`,
      });
    }
  },

  findAllStudentAndStaff: async (_req, res) => {
    try {
      const students = (await Student.findAll()).map((student) => {
        return { ...student.dataValues, type: "student" };
      });

      const staffs = (await Staff.findAll()).map((staff) => {
        return { ...staff.dataValues, type: "staff" };
      });
      res.send([...students, ...staffs]);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: `Error 500 Internal Server Error`,
      });
    }
  },

  updateUserAdminDetails: async (req, res) => {
    const email = req.params.email;
    try {
      const num = await userAdmin.update(req.body, {
        where: { email: email },
      });

      if (num == 1) {
        res.send({ message: "Updated Successfully." });
      } else {
        res.send({ message: `Cannot Update` });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error 500 Updating`,
      });
    }
  },

  deleteUserAdmin: async (req, res) => {
    try {
      let email = req.params.email;

      await userAdmin.destroy({
        where: { email: email },
      });

      return res.status(200).json({
        message: "User Admin Deleted Successfully",
      });
    } catch (err) {
      return res.status(400).json({ error });
    }
  },

  createUserAdmin: (req, res) => {
    const creates = {
      email: req.body.email,
      password: req.body.password,
      suspended: req.body.suspended,
      lastLoggedIn: req.body.lastLoggedIn,
      lastLoggedOut: req.body.lastLoggedOut,
    };

    userAdmin
      .create(creates)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error occured",
        });
      });
  },
};