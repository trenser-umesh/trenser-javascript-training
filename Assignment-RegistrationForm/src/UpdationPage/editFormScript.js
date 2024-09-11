let userID;
let nameValid = false,
  passwordValid = false,
  professionValid = false,
  emailValid = false,
  bioValid = false;
let submitButton = document.getElementById("btn");
const nameElement = document.getElementById("name");
const passwordElement = document.getElementById("password");
const professionElement = document.getElementById("profession");
const bioElement = document.getElementById("bio");
const emailElement = document.getElementById("email");

nameElement.addEventListener("change", nameValidation);
passwordElement.addEventListener("change", passwordValidation);
professionElement.addEventListener("change", professionValidation);
bioElement.addEventListener("change", bioValidation);
emailElement.addEventListener("change", emailValidation);

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get("_id");
  fetch(
    `https://crudcrud.com/api/a1c7e2f11f4645db8eae360435521eb5/users/${userID}`
  )
    .then((response) => response.json())
    .then((data) => populateForm(data))
    .catch((error) => console.log("Error: ", error));
});

function populateForm(data) {
  nameElement.value = data.name;
  passwordElement.value = data.password;
  professionElement.value = data.profession;
  bioElement.value = data.bio;
  emailElement.value = data.email;
  userID = data._id;
  validation();
}

function nameValidation() {
  const name = nameElement.value;
  const nameError = document.getElementById("name-error");
  if (name === "" || !/^[A-Za-z]+$/.test(name)) {
    nameError.textContent = "Please enter the name properly";
    nameValid = false;
  } else {
    nameError.textContent = "";
    nameValid = true;
  }
  setButtonStatus();
}

function passwordValidation() {
  const password = passwordElement.value;
  const passwordError = document.getElementById("password-error");
  if (password === "" || !/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
    passwordError.textContent =
      "Password must contain at least 8 characters including uppercase and lowercase";
    passwordValid = false;
  } else {
    passwordError.textContent = "";
    passwordValid = true;
  }
  setButtonStatus();
}

function professionValidation() {
  const profession = professionElement.value;
  const professionError = document.getElementById("profession-error");
  if (profession === "") {
    professionError.textContent = "Please enter the profession";
    professionValid = false;
  } else {
    professionError.textContent = "";
    professionValid = true;
  }
  setButtonStatus();
}

function bioValidation() {
  const bio = bioElement.value;
  const bioError = document.getElementById("bio-error");
  if (bio === "") {
    bioError.textContent = "Please enter the bio.";
    bioValid = false;
  } else {
    bioError.textContent = "";
    bioValid = true;
  }
  setButtonStatus();
}

function emailValidation() {
  const email = emailElement.value;
  const emailError = document.getElementById("email-error");
  if (
    email === "" ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    emailError.textContent = "Please enter a valid email bio.";
    emailValid = false;
  } else {
    emailError.textContent = "";
    emailValid = true;
  }
  setButtonStatus();
}

function validation() {
  nameValidation();
  passwordValidation();
  professionValidation();
  bioValidation();
  emailValidation();
  setButtonStatus();
}

function setButtonStatus() {
  if (nameValid && passwordValid && professionValid && bioValid && emailValid) {
    submitButton.disabled = false;
    return true;
  } else {
    submitButton.disabled = true;
    return false;
  }
}

function formSubmission(event) {
  event.preventDefault();

  const userName = nameElement.value;
  const password = passwordElement.value;
  const profession = professionElement.value;
  const bio = bioElement.value;
  const email = emailElement.value;
  const userObject = {
    name: userName,
    password: password,
    profession: profession,
    bio: bio,
    email: email,
  };
  fetch(
    `https://crudcrud.com/api/a1c7e2f11f4645db8eae360435521eb5/users/${userID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("Profile updated successfully !");
      }
    })
    .catch((error) => console.log("error:", error));
}
