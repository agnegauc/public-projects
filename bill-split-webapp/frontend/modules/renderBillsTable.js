export const renderBillsTable = (bills) => {
  const tableBody = document.body.querySelector("#table-body");
  tableBody.textContent = "";

  bills.forEach((bill) => {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdDescription = document.createElement("td");
    const tdAmount = document.createElement("td");

    tdId.textContent = bill.id;
    tdDescription.textContent = bill.description;
    tdAmount.textContent = `$ ${bill.amount}`;

    tr.append(tdId, tdDescription, tdAmount);
    tableBody.append(tr);
  });
};
