import accountSchema from "../models/Account.js";
import accountsService from "../services/accountsService.js";

const assignGroup = async (req, res) => {
  const { group_id } = req.body;
  const user_id = req.user_id;

  try {
    await accountSchema.validateAsync({ group_id, user_id });
  } catch (error) {
    return res.status(400).send({ error: "Incorrect group id provided" }).end();
  }

  try {
    await accountsService.checkDuplicates(group_id, user_id);
  } catch (error) {
    return res.status(400).send({ error: "Group already assigned" }).end();
  }

  try {
    await accountsService.assignGroup(group_id, user_id);

    return res
      .status(201)
      .send({ message: "New group successfully assigned." })
      .end();
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again" })
      .end();
  }
};

const getUserGroups = async (req, res) => {
  const userId = req.user_id;

  try {
    const userGroups = await accountsService.getUserGroups(userId);

    return res.send(userGroups).end();
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unexpected error. Please try again." })
      .end();
    return console.error(error);
  }
};

export default {
  assignGroup,
  getUserGroups,
};
