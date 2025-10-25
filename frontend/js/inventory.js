// js/inventory.js
async function viewInventory() {
  try {
    const data = await apiFetch("/inventory");
    const table = document.getElementById("inventory-table");
    table.innerHTML = data.map(i =>
      `<tr><td>${i.name}</td><td>${i.category}</td><td>${i.quantity}</td><td>${i.location}</td></tr>`
    ).join("");
  } catch (err) {
    console.error(err);
    alert("Error loading inventory");
  }
}

async function addInventory() {
  const item = {
    itemId: document.getElementById("itemId").value,
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    quantity: parseInt(document.getElementById("quantity").value),
    location: document.getElementById("location").value
  };
  try {
    await apiFetch("/inventory", { method: "POST", body: JSON.stringify(item) });
    alert("Item added");
    viewInventory();
  } catch (err) {
    alert("Add failed: " + err.message);
  }
}
