const form = document.body.querySelector("#sign-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailInputValue = document.body
    .querySelector("#email-input")
    .value.trim();
  const passwordInputValue = document.body
    .querySelector("#password-input")
    .value.trim();

  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInputValue,
        password: passwordInputValue,
      }),
    });

    const authData = await response.json();

    if (!response.ok || response.status >= 400) {
      return alert(authData?.error || response.statusText);
    }

    localStorage.setItem("token", authData.token);

    alert(authData.message);

    location.assign("./groups.html");
    return;
  } catch (error) {
    alert(error.message);
  }
});

// Typewriter effect (comments for learning purposes):

const content = ["easier", "better", "faster", "stronger"];
let part = 0; // current element from the array
let partIndex = 0; // current character from the element
let intervalVal; // holds the handle returned from setInterval
const textBox = document.querySelector("#text");
const cursor = document.querySelector("#cursor");

function type() {
  // Get substring with 1 character added
  const text = content[part].substring(0, partIndex + 1);
  textBox.innerHTML = text;
  partIndex++;

  // If full sentence has been displayed then start to delete the sentence after some time
  if (text === content[part]) {
    cursor.style.display = "none";

    clearInterval(intervalVal);
    setTimeout(function () {
      intervalVal = setInterval(deleteText, 50);
    }, 1000);
  }
}

function deleteText() {
  const text = content[part].substring(0, partIndex - 1);
  textBox.innerHTML = text;
  partIndex--;

  if (text === "") {
    clearInterval(intervalVal);

    // If current sentence was last then display the first one, else move to the next
    if (part === content.length - 1) part = 0;
    else part++;

    partIndex = 0;

    // Start to display the next sentence after some time
    setTimeout(function () {
      cursor.style.display = "inline-block";
      intervalVal = setInterval(type, 100);
    }, 200);
  }
}

// Start the typing effect on load
intervalVal = setInterval(type, 100);
