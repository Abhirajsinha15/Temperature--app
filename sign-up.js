
document.addEventListener("DOMContentLoaded", function () {
    const validationForm = document.getElementById("signInForm");
    const emailInput = document.getElementById("userEmail");
    const passInput = document.getElementById("userPassword");
    const confirmPassInput = document.getElementById("confirmPassword");
    const phoneInput = document.getElementById("phoneNumber");
    const ageInput = document.getElementById("userAge"); 
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const nameInputs = [firstName , lastName]



    // Validate name (Live)
    nameInputs.forEach(input => {
        input.addEventListener("input", function (e) {
            const regex = /^[A-Za-z ]+$/;
            if (!regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(/[^A-Za-z ]/g, "");
            }
            validateName(input);
        });

        input.addEventListener("blur", function () {
            validateName(input);
        });
    });

    function validateName(input) {
        const name = input.value.trim();
        if (name.length < 3) {
            showError(input, "Name must be at least 3 characters.");
        } else {
            showSuccess(input);
        }
    }

    // Validate Email
    emailInput.addEventListener("input", validateEmail);
    emailInput.addEventListener("blur", validateEmail);

    function validateEmail() {
        const email = emailInput.value;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(email)) {
            showError(emailInput, "Invalid email format.");
        } else {
            showSuccess(emailInput);
        }
    }

    // Validate Password
    passInput.addEventListener("input", function () {
        validatePassword();
        validateConfirmPassword();
    });

    passInput.addEventListener("blur", validatePassword);

    function validatePassword() {
        const password = passInput.value;
        const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!regex.test(password)) {
            showError(passInput, "Password should have at least 6 characters, 1 uppercase letter, and 1 number.");
        } else {
            showSuccess(passInput);
        }
    }

    // Validate Confirm Password
    confirmPassInput.addEventListener("input", validateConfirmPassword);
    confirmPassInput.addEventListener("blur", validateConfirmPassword);

    


    function validateConfirmPassword() {
        if (confirmPassInput.value.trim() === "") {
            showError(confirmPassInput, "Confirm Password cannot be empty.");
        } else if (confirmPassInput.value !== passInput.value) {
            showError(confirmPassInput, "Passwords do not match.");
        } else {
            showSuccess(confirmPassInput);
        }
    }

    

    // Validate Phone Number
    phoneInput.addEventListener("keydown", function (e) {
        if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener("input", function () {
        phoneInput.value = phoneInput.value.replace(/\D/g, ""); 
        validatePhone();
    });

    phoneInput.addEventListener("blur", validatePhone);

    function validatePhone() {
        if (phoneInput.value.length !== 10) {
            showError(phoneInput, "Phone number must be 10 digits.");
        } else {
            showSuccess(phoneInput);
        }
    }

    // Validate Age
    ageInput.addEventListener("change", validateAge);
    ageInput.addEventListener("blur", validateAge);

   

    function validateAge() {
        if (ageInput.value.trim() === "") {
            showError(ageInput, "Age cannot be empty.");
        } else if (ageInput.value  < 18) {
            showError(ageInput, "You must be 18 or older.");
        } else {
            showSuccess(ageInput);
        }
    }

   


    validationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        validateName(nameInputs[0]);
        validateName(nameInputs[1]);
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validatePhone();
        validateAge();


        // No validation errors — proceed to save the data
        const errorElements = document.querySelectorAll(".invalid");
        if (errorElements.length > 0) {
            alert("Please correct the errors before submitting the form.");
            return;
        }
        
         //  Generating a unique ID
        const userId = Date.now();

        // Get values from inputs
        const fullName = `${nameInputs[0].value} ${nameInputs[1].value}`;
        const email = emailInput.value;
        const password = confirmPassInput.value;

        // Create a new user object
        const newUser = { id: userId, fullName, email, password };

        // Fetch existing users from localStorage
        let users = JSON.parse(localStorage.getItem("userList")) || [];

        // Add the new user to the list
        users.push(newUser);

        //Save updated list back to localStorage
    
        localStorage.setItem("userList", JSON.stringify(users));
        const lastUser = users[users.length - 1];
        sessionStorage.setItem("loggedInUser", JSON.stringify(lastUser));

        console.log("User saved:", newUser);

        // Redirect after successful save
        console.log('page open')
        // window.location.href = "https://www.google.com";  
        window.location.href = "./loggedIn.html";  
    
    });

function showError(input, message) {
        const errorSpan = input.nextElementSibling; // Target the span next to the input
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = message;
            input.classList.add("invalid");
        }
    }
    
    function showSuccess(input) {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = "";
        }
        input.classList.remove("invalid");
    }

});


