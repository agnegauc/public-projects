import { renderBillsTable } from "./renderBillsTable.js";

const displayMessage = (message) => {
  const table = document.body.querySelector("#bills-table");
  const messageElement = document.createElement("p");

  table.textContent = "";
  messageElement.textContent = message;

  table.append(messageElement);
};

const getBills = async () => {
  const accessToken = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const group_id = +urlParams.get("group_id");

  try {
    const response = await fetch(`http://localhost:8000/bills/${group_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const bills = await response.json();

    if (!response.ok || response.status >= 400) {
      alert(bills?.error || response.statusText);
      return window.location.assign("./index.html");
    }

    if (bills.length < 1) {
      return displayMessage(
        "There are no bills at the moment. Please add a bill or try again later."
      );
    }

    renderBillsTable(bills);
  } catch (error) {
    return displayMessage(
      "Unable to connect to the server. Please contact the administrator."
    );
  }
};

export { getBills };
