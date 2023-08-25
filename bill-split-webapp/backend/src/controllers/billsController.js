import billSchema from "../models/Bill.js";
import billsService from "../services/billsService.js";

const getBills = async (req, res) => {
  const groupId = +req.params?.group_id;

  if (groupId < 0 || Number.isNaN(groupId) || typeof groupId !== "number") {
    return res
      .status(400)
      .send({
        error: `Incorrect id provided. Please try again.`,
      })
      .end();
  }

  try {
    const bills = await billsService.getBills(groupId);
    res.status(200).send(bills).end();
  } catch (error) {
    res.status(500).send(error).end();
    console.error(error);
  }
};

const addBill = async (req, res) => {
  let billData = req.body;

  try {
    billData = await billSchema.validateAsync(billData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Incorrect input." }).end();
  }

  try {
    await billsService.addBill(billData);
    res.status(200).send({ message: "New bill added successfully!" }).end();
  } catch (error) {
    res.status(500).send(error).end();
    console.error(error);
  }
};

export default { getBills, addBill };
