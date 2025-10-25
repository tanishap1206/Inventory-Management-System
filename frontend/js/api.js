// js/api.js
const API_BASE = "http://localhost:5000/api";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "API error");
  }
  return res.json();
}
