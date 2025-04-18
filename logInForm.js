
document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("loginForm");
    const signinEmail = document.getElementById("signinEmail");
    const userPassword = document.getElementById("userPassword");
    const loginBtn = document.getElementById("loginBtn");
    
    
  


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
        validateEmail();
        validatePassword();

        const errorElements = document.querySelectorAll(".invalid");

        if (signinEmail.value.trim() === "" || userPassword.value.trim() === "") {
            alert("Please fill in all fields before submitting.");
            e.preventDefault();
            return;
        }

        if (errorElements.length > 0) {
            e.preventDefault();
            alert("Please correct the errors before submitting the form.");
        } else {
            alert("Form submitted successfully!");
            window.location.href = "loggedIn.html";
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

    loginBtn.addEventListener("click" ,function(e){
        e.preventDefault()
        validateEmailFromStorage()
      })

    function validateEmailFromStorage(){
        const users = JSON.parse(localStorage.getItem("userList")) || [];
        const signinEmail = document.getElementById("signinEmail").value.trim();
        const userPassword = document.getElementById("userPassword").value;

        // Find user by email
        const matchedUser = users.find(user => user.email === signinEmail);
    

        if(matchedUser){
            if(matchedUser.password === userPassword){
                console.log("Login successfull:" ,matchedUser);
                window.location.href = "./loggedIn.html";  
                
            }
            else{
                console.log("Incorrect password");
                
            }
            
        }
        else{
            console.log("email not found");
            
        }
    }

});


