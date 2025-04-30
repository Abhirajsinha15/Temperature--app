
document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("loginForm");
    const signinEmail = document.getElementById("signinEmail");
    const userPassword = document.getElementById("userPassword");
    
    
  


    if (signinEmail) {
        signinEmail.addEventListener("input", validateEmail);
        signinEmail.addEventListener("blur", validateEmail);
    }

    if (userPassword) {
        userPassword.addEventListener("input", validatePassword);
        userPassword.addEventListener("blur", validatePassword);
    }

    function validateEmail() {
        const email = signinEmail.value.trim();
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === "") {
            showError(signinEmail, "Email cannot be empty.");
        } else if (!regex.test(email)) {
            showError(signinEmail, "Invalid email format.");
        } else {
            showSuccess(signinEmail);
        }
    }

    function validatePassword() {
        const password = userPassword.value.trim();
        const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (password === "") {
            showError(userPassword, "Password cannot be empty.");
        } else if (!regex.test(password)) {
            showError(userPassword, "Password must have at least 6 characters, 1 uppercase letter, and 1 number.");
        } else {
            showSuccess(userPassword);
        }
    }

    signinForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        validateEmail();
        validatePassword();
    
        const errorElements = document.querySelectorAll(".invalid");
    
        if (signinEmail.value.trim() === "" || userPassword.value.trim() === "") {
            alert("Please fill in all fields before submitting.");
            return;
        }
    
        if (errorElements.length > 0) {
            alert("Please correct the errors before submitting the form.");
            return;
        }
    
        const loginSuccessful = storeLoggedInUserInSession();
    
        if (loginSuccessful) {
            window.location.href = "./loggedIn.html";
        } else {
            alert("Incorrect email or password.");
        }
    });
    

    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = message;
        }
        input.classList.add("invalid");
    }

    function showSuccess(input) {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = "";
        }
        input.classList.remove("invalid");
    }



    function storeLoggedInUserInSession() {
        const users = JSON.parse(localStorage.getItem("userList")) || [];
        const enteredEmail = signinEmail.value.trim();
        const enteredPassword = userPassword.value;
    
        const matchedUser = users.find(user => user.email === enteredEmail);
    
        if (matchedUser && matchedUser.password === enteredPassword) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
            return true;
        } else {
            return false;
        }
    }
    
    

 

});


