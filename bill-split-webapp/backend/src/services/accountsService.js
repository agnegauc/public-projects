import mysql from "mysql2/promise.js";
import { MYSQL_CONFIG } from "../config.js";

const checkDuplicates = async (group_id, user_id) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [duplicates] = await con.execute(
      `SELECT * FROM accounts WHERE group_id = ${mysql.escape(
        group_id
      )} AND user_id = ${mysql.escape(user_id)}`
    );

    await con.end();

    if (duplicates.length > 0) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const assignGroup = async (group_id, user_id) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO accounts (group_id, user_id) VALUES (${mysql.escape(
        group_id
      )},${mysql.escape(user_id)})`
    );

    await con.end();
  } catch (error) {
    throw error;
  }
};

const getUserGroups = async (userId) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [userGroups] = await con.execute(
      `SELECT accounts.group_id, splitgroups.name FROM accounts JOIN splitgroups ON (accounts.group_id=splitgroups.id) WHERE accounts.user_id=${mysql.escape(
        userId
      )}`
    );

    await con.end();

    return userGroups;
  } catch (error) {
    throw error;
  }
};

export default {
  assignGroup,
  getUserGroups,
  checkDuplicates,
};
