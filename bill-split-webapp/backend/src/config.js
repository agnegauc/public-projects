import dotenv from "dotenv";

dotenv.config();

export const PORT = +process.env.SERVER_PORT || 3_000;

export const jwtSecret = process.env.JWT_SECRET;

export const MYSQL_CONFIG = {
  host: "localhost",
  user: "root",
  password: "exam",
  database: "exam",
  port: "3306",
};
