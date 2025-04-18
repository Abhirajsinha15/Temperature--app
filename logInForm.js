// document.addEventListener("DOMContentLoaded", function () {
//     const loginBtn = document.getElementById("loginBtn");
//     const email = document.getElementById("signinEmail").value.trim();
//     const password = document.getElementById("userLoginPassword").value.trim();

//     if (loginBtn) {
//         loginBtn.addEventListener("click", function () {

//             if (!email || !password) {
//                 alert("Please enter both email and password.");
//                 return;
//             }

//             // Try Firebase Authentication first
//             signInWithEmailAndPassword(auth, email, password)
//                 .then((userCredential) => {
//                     const user = userCredential.user;
//                     console.log("Firebase User logged in:", user);

//                     // Store user data in localStorage
//                     localStorage.setItem("userEmail", user.email);
//                     localStorage.setItem("userName", user.displayName || "Firebase User");
//                     localStorage.setItem("userProfilePic", user.photoURL || "");

//                     console.log("Redirecting to loggedIn.html...");
//                     window.location.href = "./loggedIn.html";
//                 })
//                 .catch((error) => {
//                     console.log("Firebase login failed, checking Local Storage...");

//                     // If Firebase login fails, check Local Storage for user
//                     const storedUserData = JSON.parse(localStorage.getItem("userData"));

//                     if (storedUserData && storedUserData.email === email) {
//                         alert("Logged in successfully (Local Storage).");
//                         console.log("Local Storage User logged in:", storedUserData);

//                         // Store user info in localStorage
//                         localStorage.setItem("userEmail", storedUserData.email);
//                         localStorage.setItem("userName", storedUserData.name);
//                         localStorage.setItem("userProfilePic", storedUserData.profilePic || "");

//                         console.log("Redirecting to loggedIn.html...");
//                         window.location.href = "./loggedIn.html";
//                     } else {
//                         alert("Invalid email or password.");
//                     }
//                 });
//         });
//     }
// });




// document.addEventListener("DOMContentLoaded", function () {
//     const signinForm = document.getElementById("loginForm");
//     const signinEmail = document.getElementById("signinEmail");
//     const userPassword = document.getElementById("userPassword");

//     if (signinEmail) {
//         signinEmail.addEventListener("input", validateEmail);
//         signinEmail.addEventListener("blur", validateEmail);
//     }

//     if (userPassword) {
//         userPassword.addEventListener("input", validatePassword);
//         userPassword.addEventListener("blur", validatePassword);
//     }

//     function validateEmail() {
//         const email = signinEmail.value.trim();
//         const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//         if (email === "") {
//             showError(signinEmail, "Email cannot be empty.");
//         } else if (!regex.test(email)) {
//             showError(signinEmail, "Invalid email format.");
//         } else {
//             showSuccess(signinEmail);
//         }
//     }

//     function validatePassword() {
//         const password = userPassword.value.trim();
//         const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

//         if (password === "") {
//             showError(userPassword, "Password cannot be empty.");
//         } else if (!regex.test(password)) {
//             showError(userPassword, "Password must have at least 6 characters, 1 uppercase letter, and 1 number.");
//         } else {
//             showSuccess(userPassword);
//         }
//     }

//     signinForm.addEventListener("submit", function (e) {
//         validateEmail();
//         validatePassword();

//         const errorElements = document.querySelectorAll(".invalid");

//         if (signinEmail.value.trim() === "" || userPassword.value.trim() === "") {
//             alert("Please fill in all fields before submitting.");
//             e.preventDefault();
//             return;
//         }

//         if (errorElements.length > 0) {
//             e.preventDefault();
//             alert("Please correct the errors before submitting the form.");
//         } else {
//             alert("Form submitted successfully!");
//             window.location.href = "loggedIn.html";
//         }
//     });

//     function showError(input, message) {
//         const errorSpan = input.nextElementSibling;
//         if (errorSpan && errorSpan.classList.contains("error")) {
//             errorSpan.textContent = message;
//         }
//         input.classList.add("invalid");
//     }

//     function showSuccess(input) {
//         const errorSpan = input.nextElementSibling;
//         if (errorSpan && errorSpan.classList.contains("error")) {
//             errorSpan.textContent = "";
//         }
//         input.classList.remove("invalid");
//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault(); 

            const email = document.getElementById("signinEmail").value.trim();
            const password = document.getElementById("userPassword").value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            // Retrieve stored user data from localStorage
            const storedUserData = JSON.parse(localStorage.getItem("userData"));

            if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
                alert("Logged in successfully (Local Storage).");

                // Store user info in localStorage for session
                localStorage.setItem("userEmail", storedUserData.email);
                localStorage.setItem("userName", storedUserData.name);
                localStorage.setItem("userProfilePic", storedUserData.profilePic || "");

                console.log("Redirecting to loggedIn.html...");
                window.location.href = "./loggedIn.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }
});
