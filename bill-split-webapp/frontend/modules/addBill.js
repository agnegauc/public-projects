const addBill = async (event) => {
  event.preventDefault();

  const accessToken = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const group_id = +urlParams.get("group_id");
  const amount = +document.body.querySelector("#amount-input").value;
  const description = document.body
    .querySelector("#description-input")
    .value.trim();

  try {
    const response = await fetch("http://localhost:8000/bills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        group_id,
        amount,
        description,
      }),
    });

    const data = await response.json();

    if (!response.ok || response.status >= 400) {
      return console.log(data?.error || response.statusText);
    }

    alert(data.message);

    location.assign(`./bills.html?group_id=${group_id}`);

    return;
  } catch (error) {
    return console.error(error);
  }
};

export { addBill };
