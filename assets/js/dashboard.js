// Redirect to other pages
function navigateTo(page) {
  window.location.href = page;
}

// Logout and go back to login
function logout() {
  window.location.href = "index.html";
}

// Protect dashboard if not logged in
document.addEventListener("DOMContentLoaded", function () {
  const storedUser = localStorage.getItem("username");
  const storedPass = localStorage.getItem("password");

  if (!storedUser || !storedPass) {
    alert("Please log in first!");
    window.location.href = "index.html";
  }
});
