let nameValid = false,
  passwordValid = false,
  professionValid = false,
  emailValid = false,
  bioValid = false;

const nameElement = document.getElementById("name");
const passwordElement = document.getElementById("password");
const professionElement = document.getElementById("profession");
const bioElement = document.getElementById("bio");
const emailElement = document.getElementById("email");
let submitButton = document.getElementById("btn");

nameElement.addEventListener("change", nameValidation);
passwordElement.addEventListener("change", passwordValidation);
professionElement.addEventListener("change", professionValidation);
bioElement.addEventListener("change", bioValidation);
emailElement.addEventListener("change", emailValidation);
validation();

function validation() {
  if (nameValid && passwordValid && professionValid && bioValid && emailValid) {
    submitButton.disabled = false;
    return true;
  } else {
    submitButton.disabled = true;
    return false;
  }
}

function nameValidation() {
  const name = nameElement.value;
  const nameError = document.getElementById("name-error");
  if (name === "" || !/^[A-Za-z]+$/.test(name)) {
    nameError.textContent = "Please enter the name properly";
    nameValid = false;
    validation();
  } else {
    nameError.textContent = "";
    nameValid = true;
    validation();
  }
}

function passwordValidation() {
  const password = passwordElement.value;
  const passwordError = document.getElementById("password-error");
  if (password === "" || !/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
    passwordError.textContent =
      "Password must contain at least 8 characters including uppercase and lowercase";
    passwordValid = false;
    validation();
  } else {
    passwordError.textContent = "";
    passwordValid = true;
    validation();
  }
}

function professionValidation() {
  const profession = professionElement.value;
  const professionError = document.getElementById("profession-error");
  if (profession === "") {
    professionError.textContent = "Please enter the profession";
    professionValid = false;
    validation();
  } else {
    professionError.textContent = "";
    professionValid = true;
    validation();
  }
}

function bioValidation() {
  const bio = bioElement.value;
  const bioError = document.getElementById("bio-error");
  if (bio === "") {
    bioError.textContent = "Please enter the bio.";
    bioValid = false;
    validation();
  } else {
    bioError.textContent = "";
    bioValid = true;
    validation();
  }
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
    validation();
  } else {
    emailError.textContent = "";
    emailValid = true;
    validation();
  }
}

function formSubmission(event) {
  event.preventDefault();
  if (validation()) {
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
    fetch(`https://crudcrud.com/api/a1c7e2f11f4645db8eae360435521eb5/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
      .then((response) => {
        if (response.ok) {
          alert("Registration successful ");
        }
      })
      .catch((error) => console.log("error:", error));
  }
}
