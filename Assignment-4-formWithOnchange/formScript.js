document.getElementById("password").onchange = function () { passwordValidation() };
document.getElementById("age").onchange = function () { ageValidation() };
document.getElementById("address").onchange = function () { addressValidation() };
document.getElementById("email").onchange = function () { emailValidation() };
document.getElementById("phone").onchange = function () { phoneValidation() };

function nameValidation(e) {
    console.log("event", e.target.value);
    const name = e.target.value
    const nameError = document.getElementById("name-error");
    if (name === "" || !(/^[A-Za-z]+$/.test(name))) {
        nameError.textContent = "Please enter the name properly";
    }
    else {
        nameError.textContent = "";
    }
}

function passwordValidation() {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("password-error");
    if (password === "" || !(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password))) {
        passwordError.textContent = "Password must contain atleast 8 characters including uppercase and lowercase";
    }
    else {
        passwordError.textContent = "";
    }
}

function ageValidation() {
    const age = document.getElementById("age").value;
    const ageError = document.getElementById("age-error");
    if (age === "" || !(/^(?!0$)[1-9]\d*$/.test(age)) || parseInt(age) < 18 || parseInt(age) > 100) {
        ageError.textContent = "Please enter a valid age between 18 and 100";
    }
    else {
        ageError.textContent = "";
    }
}

function addressValidation() {
    const address = document.getElementById("address").value;
    const addressError = document.getElementById("address-error");
    if (address === "") {
        addressError.textContent = "Please enter the address.";
    }
    else {
        addressError.textContent = "";
    }
}

function emailValidation() {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("email-error");
    if (email === "" || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
        emailError.textContent = "Please enter a valid email address.";
    }
    else {
        emailError.textContent = "";
    }
}

function phoneValidation() {
    const phone = document.getElementById("phone").value;
    const phoneError = document.getElementById("phone-error");
    if (phone === "" || !(/^\d{10}$/.test(phone))) {
        phoneError.textContent = "Please enter a valid phone number.";
    }
    else {
        phoneError.textContent = "";
    }
}