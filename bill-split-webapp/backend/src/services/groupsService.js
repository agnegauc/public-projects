import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config.js";

const getGroups = async () => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const allGroups = await con.execute(`SELECT * FROM splitgroups`);

    await con.end();

    return allGroups;
  } catch (error) {
    throw error;
  }
};

const addGroup = async (name) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO splitgroups (name) VALUES (${mysql.escape(name)})`
    );

    await con.end();
  } catch (error) {
    throw error;
  }
};

export default { getGroups, addGroup };
