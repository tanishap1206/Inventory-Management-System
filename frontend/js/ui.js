// js/ui.js
function showRoleUI(role) {
  document.querySelectorAll(".role-section").forEach(el => el.style.display = "none");
  if (role === "admin") document.getElementById("admin-section").style.display = "block";
  else if (role === "staff") document.getElementById("staff-section").style.display = "block";
  else document.getElementById("guest-section").style.display = "block";
}
