// src/data/dummyData.js
export const buildings = [
  {
    id: 1,
    name: "AI Building",
    wings: [
      { 
        name: "North Wing", 
        rooms: ["N101", "N102", "N103", "N104"],
        items: 120
      },
      { 
        name: "South Wing", 
        rooms: ["S101", "S102", "S103", "S104"],
        items: 95
      },
      { 
        name: "East Wing", 
        rooms: ["E101", "E102", "E103", "E104"],
        items: 150
      },
      { 
        name: "West Wing", 
        rooms: ["W101", "W102", "W103", "W104"],
        items: 80
      }
    ],
    totalItems: 445
  },
  {
    id: 2,
    name: "EB AI Building",
    wings: [
      { 
        name: "Block A", 
        rooms: ["A101", "A102", "A103"],
        items: 75
      },
      { 
        name: "Block B", 
        rooms: ["B101", "B102", "B103"],
        items: 60
      }
    ],
    totalItems: 135
  },
  {
    id: 3,
    name: "CSMD",
    wings: [
      { 
        name: "Main Building", 
        rooms: ["M101", "M102", "M201", "M202"],
        items: 200
      },
      { 
        name: "Annex", 
        rooms: ["ANX1", "ANX2", "ANX3"],
        items: 90
      }
    ],
    totalItems: 290
  }
];

export const inventoryItems = [
  {
    id: 1,
    name: "Dell XPS 15 Laptop",
    category: "Electronics",
    subCategory: "Laptops",
    brand: "Dell",
    model: "XPS 15 9520",
    serialNumber: "DLXPS15223456",
    building: "AI Building",
    wing: "East Wing",
    room: "E101",
    status: "Available",
    purchaseDate: "2023-05-15",
    price: 1599.99
  },
  {
    id: 2,
    name: "Epson Projector",
    category: "AV Equipment",
    subCategory: "Projectors",
    brand: "Epson",
    model: "EX9260",
    serialNumber: "EPEX92607890",
    building: "CSMD",
    wing: "Main Building",
    room: "M201",
    status: "In Use",
    purchaseDate: "2022-11-20",
    price: 899.99
  },
  {
    id: 3,
    name: "Shure Microphone",
    category: "Audio",
    subCategory: "Microphones",
    brand: "Shure",
    model: "SM58",
    serialNumber: "SHSM5812345",
    building: "EB AI Building",
    wing: "Block A",
    room: "A102",
    status: "Available",
    purchaseDate: "2023-02-10",
    price: 99.99
  },
  {
    id: 4,
    name: "iPad Pro",
    category: "Electronics",
    subCategory: "Tablets",
    brand: "Apple",
    model: "iPad Pro 12.9",
    serialNumber: "APIPPR123456",
    building: "AI Building",
    wing: "South Wing",
    room: "S102",
    status: "Maintenance",
    purchaseDate: "2023-07-05",
    price: 1099.99
  },
  {
    id: 5,
    name: "Logitech ConferenceCam",
    category: "AV Equipment",
    subCategory: "Conference Systems",
    brand: "Logitech",
    model: "BCC950",
    serialNumber: "LGBCC9507890",
    building: "CSMD",
    wing: "Annex",
    room: "ANX2",
    status: "In Use",
    purchaseDate: "2022-09-12",
    price: 499.99
  }
];

export const brands = [
  { name: "Dell", count: 12 },
  { name: "Apple", count: 8 },
  { name: "Epson", count: 5 },
  { name: "Shure", count: 7 },
  { name: "Logitech", count: 6 },
  { name: "Lenovo", count: 4 },
  { name: "Samsung", count: 3 }
];

export const categories = [
  { name: "Electronics", count: 35 },
  { name: "AV Equipment", count: 22 },
  { name: "Audio", count: 18 },
  { name: "Furniture", count: 45 },
  { name: "Networking", count: 15 }
];

// Add the missing exports that are causing errors
export const adminInventory = [
  {
    id: 1,
    name: "Pending Approval Items",
    count: 5,
    icon: "⏳",
    description: "Items waiting for admin approval"
  },
  {
    id: 2,
    name: "Low Stock Items",
    count: 8,
    icon: "📉",
    description: "Items that need restocking"
  },
  {
    id: 3,
    name: "Maintenance Required",
    count: 3,
    icon: "🛠️",
    description: "Items needing maintenance"
  }
];

export const userRequests = [
  {
    id: 1,
    userName: "John Doe",
    item: "Dell XPS 15 Laptop",
    requestDate: "2023-10-15",
    status: "Pending",
    priority: "High"
  },
  {
    id: 2,
    userName: "Jane Smith",
    item: "Epson Projector",
    requestDate: "2023-10-14",
    status: "Approved",
    priority: "Medium"
  },
  {
    id: 3,
    userName: "Robert Johnson",
    item: "Shure Microphone",
    requestDate: "2023-10-13",
    status: "Rejected",
    priority: "Low"
  },
  {
    id: 4,
    userName: "Sarah Williams",
    item: "iPad Pro",
    requestDate: "2023-10-12",
    status: "Pending",
    priority: "High"
  }
];