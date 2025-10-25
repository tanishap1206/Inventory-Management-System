// js/auth.js
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.user.role);
    localStorage.setItem("username", res.user.name);
    alert(`Welcome ${res.user.name}! Role: ${res.user.role}`);
    showRoleUI(res.user.role);
  } catch (err) {
    alert("Login failed: " + err.message);
  }
}

function logout() {
  localStorage.clear();
  location.reload();
}
