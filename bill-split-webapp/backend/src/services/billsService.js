import mysql from "mysql2/promise.js";
import { MYSQL_CONFIG } from "../config.js";

const getBills = async (groupId) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT * FROM bills WHERE group_id = ${mysql.escape(groupId)}`
    );

    await con.end();

    return result[0];
  } catch (error) {
    throw error;
  }
};

const addBill = async (billData) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO bills (group_id, amount, description) VALUES (${mysql.escape(
        billData.group_id
      )}, ${mysql.escape(billData.amount)}, ${mysql.escape(
        billData.description
      )})`
    );

    await con.end();
  } catch (error) {
    throw error;
  }
};

export default {
  getBills,
  addBill,
};
