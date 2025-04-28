

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3XP_Ka9Hv8ucvuYKLe2onseXwzUTdu64",
    authDomain: "sign-up-with-42078.firebaseapp.com",
    projectId: "sign-up-with-42078",
    storageBucket: "sign-up-with-42078.firebasestorage.app",
    messagingSenderId: "855060473773",
    appId: "1:855060473773:web:c3db39d4a810500a7d2324"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.language = 'en';
const provider = new GoogleAuthProvider();

// Enable session persistence
setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("Session persistence enabled"))
    .catch((error) => console.error("Persistence error:", error));

document.addEventListener("DOMContentLoaded", function () {
    const googleLogin = document.getElementById("signUpGoogle");

    if (googleLogin) {
        googleLogin.addEventListener("click", function () {
            signInWithPopup(auth, provider)
                .then((result) => {
                    console.log("User signed in:", result.user);
                    const user = result.user;

                    // Store in localStorage (excluding password)
                    localStorage.setItem("userName", user.displayName);
                    localStorage.setItem("userEmail", user.email);
                    localStorage.setItem("userProfilePic", user.photoURL);

                        
                    // Also store in sessionStorage
                                const loggedInUser = {
                                fullName: user.displayName,
                                email: user.email,
                                profilePic: user.photoURL
                                };
                                sessionStorage.setItem("userList", JSON.stringify(loggedInUser));

                    console.log("Redirecting to loggedIn.html...");
                    window.location.href = "./loggedIn.html"; // Redirect after login
                })
                .catch((error) => console.error("Login Error:", error.message));
        });
    }

    const form = document.getElementById("signInForm"); 

    if (!form) {
        console.error("Form not found! Ensure the form has the correct ID.");
        return;
    }


    form.addEventListener("submit", function (e) {
        e.preventDefault(); 
    
        const nameField = document.getElementById("firstName");
        const emailField = document.getElementById("userEmail");
        const passwordField = document.getElementById("userPassword");
    
        if (!nameField || !emailField || !passwordField) {
            alert("Some required fields are missing.");
            return;
        }
    
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const password = passwordField.value.trim();
    
        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }
    
        function generateProfilePicture(name) {
            if (!name) return ""; 
            const firstLetter = name.charAt(0).toUpperCase();
            return `https://dummyimage.com/100x100/000/fff&text=${firstLetter}`;
        }
    
        const profilePic = generateProfilePicture(name);
    
        // Store user data including password in localStorage
        const userData = { name, email, password, profilePic };
        localStorage.setItem("userData", JSON.stringify(userData));
    
        console.log("User Data Stored:", userData);
    
        window.location.href = "loggedIn.html";
    });
    
});
