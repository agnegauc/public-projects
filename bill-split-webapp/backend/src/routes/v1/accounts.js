// import express from "express";
// import mysql from "mysql2/promise";
// import { MYSQL_CONFIG } from "../../config.js";
// import accountSchema from "../../models/Account.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { group_id } = req.body;
//   const user_id = req.user_id;

//   try {
//     await accountSchema.validateAsync({ group_id, user_id });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({ error: "Incorrect group id provided" }).end();
//   }

//   try {
//     const con = await mysql.createConnection(MYSQL_CONFIG);

//     const [isDuplicate] = await con.execute(
//       `SELECT * FROM accounts WHERE group_id = ${mysql.escape(
//         group_id
//       )} AND user_id = ${mysql.escape(user_id)}`
//     );

//     if (isDuplicate.length > 0) {
//       return res.status(409).send({ error: "Group already assigned" }).end();
//     }

//     await con.execute(
//       `INSERT INTO accounts (group_id, user_id) VALUES (${mysql.escape(
//         group_id
//       )},${mysql.escape(user_id)})`
//     );

//     await con.end();

//     return res
//       .status(201)
//       .send({ message: "New group successfully assigned." })
//       .end();
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ error: "Unexpected error. Please try again" })
//       .end();
//   }
// });

// router.get("/", async (req, res) => {
//   const userId = req.user_id;

//   try {
//     const con = await mysql.createConnection(MYSQL_CONFIG);
//     const userGroups = await con.execute(
//       `SELECT accounts.group_id,splitgroups.name FROM accounts JOIN splitgroups ON (accounts.group_id=splitgroups.id) WHERE accounts.user_id=${mysql.escape(
//         userId
//       )}`
//     );

//     await con.end();

//     return res.send(userGroups[0]).end();
//   } catch (error) {
//     res
//       .status(500)
//       .send({ error: "Unexpected error. Please try again." })
//       .end();
//     return console.error(error);
//   }
// });

// export default router;
