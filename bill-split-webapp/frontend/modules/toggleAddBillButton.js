const toggleAddBillButton = () => {
  const addBillButton = document.body.querySelector(".no-margin-button");
  const addBillForm = document.body.querySelector(".bill-form-section");
  const buttonIsWhite = addBillButton.classList.contains("white-button");

  if (buttonIsWhite) {
    addBillButton.classList.remove("white-button");
    addBillButton.classList.add("green-button");
    addBillForm.style.display = "none";
  } else {
    addBillButton.classList.remove("green-button"),
      addBillButton.classList.add("white-button");
    addBillForm.style.display = "block";
    addBillForm.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};

export { toggleAddBillButton };
