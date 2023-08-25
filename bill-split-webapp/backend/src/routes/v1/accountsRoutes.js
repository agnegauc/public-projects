import express from "express";
import accountsController from "../../controllers/accountsController.js";

const router = express.Router();

router.post("/", accountsController.assignGroup);
router.get("/", accountsController.getUserGroups);

export default router;
