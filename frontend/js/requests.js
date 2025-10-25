async function raiseRequest() {
  const type = document.getElementById("req-type").value;
  const title = document.getElementById("req-title").value;
  const details = document.getElementById("req-details").value;
  try {
    await apiFetch("/requests", {
      method: "POST",
      body: JSON.stringify({ type, title, details })
    });
    alert("Request raised!");
  } catch (err) {
    alert("Failed: " + err.message);
  }
}

async function fetchRequests() {
  const data = await apiFetch("/requests");
  const list = document.getElementById("requests-list");
  list.innerHTML = data.map(r =>
    `<li>${r.type.toUpperCase()} - ${r.title} [${r.status}]</li>`
  ).join("");
}
