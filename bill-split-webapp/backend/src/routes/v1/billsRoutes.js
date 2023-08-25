import express from "express";
import billsController from "../../controllers/billsController.js";

const router = express.Router();

router.get("/:group_id?", billsController.getBills);
router.post("/", billsController.addBill);

export default router;
