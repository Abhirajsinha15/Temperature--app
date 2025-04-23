

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve user info from sessionStorage
    const storedName = sessionStorage.getItem("userName");
    const storedEmail = sessionStorage.getItem("userEmail");

    if (storedName && storedEmail) {
        console.log("User Data Retrieved:");
        console.log("Name:", storedName);
        console.log("Email:", storedEmail);

        // Update UI
        document.getElementById("userName").innerText = storedName;
        document.getElementById("userEmail").innerText = storedEmail;
    } else {
        console.log("No user data found. Redirecting...");
        // window.location.href = "index.html"; // Uncomment to enable redirect
    }
});


// function logout() {
//             const logOutBtn = document.getElementById("logOut")

//             logOutBtn.addEventListener("click" , function(){
//                 window.location.href = "loginForm.html";
//             })
//         }
//         logout()
    
function logout() {
    const logOutBtn = document.getElementById("logOut");

    if (logOutBtn) {
        logOutBtn.addEventListener("click", function () {
            // Optional: clear session storage if needed
            sessionStorage.clear();
            window.location.href = "loginForm.html";
        });
    } else {
        console.warn("Logout button not found.");
    }
}

logout();

