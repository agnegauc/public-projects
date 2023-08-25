import { addBill } from "./modules/addBill.js";
import { getBills } from "./modules/getBills.js";
import { toggleAddBillButton } from "./modules/toggleAddBillButton.js";

const addBillButton = document.body.querySelector(".no-margin-button");
const addBillForm = document.body.querySelector("#add-bill-form");

addBillButton.addEventListener("click", toggleAddBillButton);
addBillForm.addEventListener("submit", addBill);

await getBills();
