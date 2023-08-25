export const renderGroupCards = (groups) => {
  const container = document.body.querySelector("#group-cards-container");
  container.textContent = "";

  groups.forEach((group) => {
    const card = document.createElement("div");
    const groupName = document.createElement("p");

    groupName.textContent = group.name;
    card.className = "group-card";
    card.id = group.group_id;
    groupName.id = group.group_id;

    card.append(groupName);
    container.append(card);
  });
};
