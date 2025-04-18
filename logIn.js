

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve user info from localStorage
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedProfilePic = localStorage.getItem("userProfilePic");

    if (storedName && storedEmail) {
        console.log("User Data Retrieved:");
        console.log("Name:", storedName);
        console.log("Email:", storedEmail);
        console.log("Profile Picture:", storedProfilePic);

        // Update UI
        document.getElementById("userName").innerText = storedName;
        document.getElementById("userEmail").innerText = storedEmail;
        document.getElementById("profile").src = storedProfilePic || "default-profile.png";
    } else {
        console.log("No user data found. Redirecting...");
        // window.location.href = "index.html"; // Redirect to login page
    }
});

function logout() {
            const logOutBtn = document.getElementById("logOut")

            logOutBtn.addEventListener("click" , function(){
                window.location.href = "index.html";
            })
        }
        logout()
    

