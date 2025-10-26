 document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Handle Signup
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("newUsername").value;
      const password = document.getElementById("newPassword").value;

      if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Signup Successful! You can now login.");
        window.location.href = "index.html";
      }
    });
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const storedUser = localStorage.getItem("username");
      const storedPass = localStorage.getItem("password");

      if (username === storedUser && password === storedPass) {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid Credentials!");
      }
    });
  }
  // Protect Dashboard
if (window.location.pathname.includes("dashboard.html")) {
  const storedUser = localStorage.getItem("username");
  const storedPass = localStorage.getItem("password");

  if (!storedUser || !storedPass) {
    alert("Please log in first!");
    window.location.href = "index.html";
  }
}

});

