const form = document.getElementsByName("reg-form")[0];
form.addEventListener("submit", formValidation);
function formValidation(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const nameError = document.getElementById("name-error");
    const passwordError = document.getElementById("password-error");
    const ageError = document.getElementById("age-error");
    const addressError = document.getElementById("address-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    nameError.textContent = "";
    passwordError.textContent = "";
    ageError.textContent = "";
    addressError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    let validFlag = true;
    if (name === "" || !(/^[A-Za-z]+$/.test(name))) {
        nameError.textContent = "Please enter the name properly";
        validFlag = false;
    }
    if (password === "" || !(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password))) {
        passwordError.textContent = "Password criteria were not met properly";
        validFlag = false;
    }
    if (age === "" || !(/^(?!0$)[1-9]\d*$/.test(age))) {
        ageError.textContent = "Please enter a valid age";
        validFlag = false;
    }
    if (address === "") {
        addressError.textContent = "Please enter the address.";
        validFlag = false;
    }
    if (email === "" || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
        emailError.textContent = "Please enter a valid email address.";
        validFlag = false;
    }
    if (phone === "" || !(/^\d{10}$/.test(phone))) {
        phoneError.textContent = "Please enter a valid phone number.";
        validFlag = false;
    }
    return validFlag;
}