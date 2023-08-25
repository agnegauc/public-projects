import { getDropdownGroupsList } from "./modules/getDropdownGroupsList.js";
import { getGroups } from "./modules/getGroups.js";
import { assignGroup } from "./modules/assignGroup.js";

const groupIdForm = document.body.querySelector("#group-id-form");
const group = document.body.querySelector("#group-cards-container");

groupIdForm.addEventListener("submit", assignGroup);

group.addEventListener("click", (event) => {
  const group_id = +event.target.id;

  if (typeof group_id === "number" && !Number.isNaN(group_id)) {
    window.location.href = `./bills.html?group_id=${group_id}`;
  }

  return;
});

await getGroups();
await getDropdownGroupsList();
