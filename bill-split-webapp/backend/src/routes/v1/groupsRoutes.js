import express from "express";
import groupsController from "../../controllers/groupsController.js";

const router = express.Router();

router.get("/", groupsController.getGroups);
router.post("/", groupsController.addGroup);

export default router;
