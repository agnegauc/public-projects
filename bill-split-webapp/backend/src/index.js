import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import login from "./routes/v1/login.js";
import register from "./routes/v1/register.js";
import { verifyAuthentication } from "./middleware/verifyAuthentication.js";
import billsRoutes from "./routes/v1/billsRoutes.js";
import accountsRoutes from "./routes/v1/accountsRoutes.js";
import groupsRoutes from "./routes/v1/groupsRoutes.js";

const app = express();

app.use(cors(), express.json());

app.use("/login", login);
app.use("/register", register);
app.use("/accounts", verifyAuthentication, accountsRoutes);
app.use("/groups", verifyAuthentication, groupsRoutes);
app.use("/bills", verifyAuthentication, billsRoutes);

app.get("/", (_, res) => {
  res.send({ message: "Server is running." }).end();
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found." }).end();
});

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
