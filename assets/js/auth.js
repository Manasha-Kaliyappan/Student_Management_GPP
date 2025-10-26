document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Signup
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

  // Login
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
});
