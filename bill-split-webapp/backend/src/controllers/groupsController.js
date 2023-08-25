import groupsSchema from "../models/Group.js";
import groupsService from "../services/groupsService.js";

const getGroups = async (_, res) => {
  try {
    const allGroups = await groupsService.getGroups();

    return res.send(allGroups[0]).end();
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unexpected error. Please try again." })
      .end();
    return console.error(error);
  }
};

const addGroup = async (req, res) => {
  let { name } = req.body;

  try {
    await groupsSchema.validateAsync({ name });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ error: "Incorrect group name provided" })
      .end();
  }

  try {
    await groupsService.addGroup(name);

    return res
      .status(201)
      .send({
        message:
          "New group successfully created. Please select new group from the dropdown list to assign it to your account.",
      })
      .end();
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again" })
      .end();
  }
};

export default { getGroups, addGroup };
