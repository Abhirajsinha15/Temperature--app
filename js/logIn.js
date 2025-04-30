

document.addEventListener("DOMContentLoaded", () => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    console.log(storedUser);
    

    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      console.log("Name:", userObj.fullName);
    
      document.getElementById("userName").innerText = userObj.fullName;
    } else {
      console.log("No user data found.");
    }
});

    
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

