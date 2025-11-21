# 🐾 Beasties Frontend Demo

## 📌 Overview

This project is a **frontend demo of a creature management game** where
players can: 
- Feed and train their creatures to **increase stats** 
- Manage an **active team** 
- Explore an **interactive tile-based map** 
- Complete **randomized quests** based on creature stats 
- Gain **experience, items, and progression** 
- Play on **mobile view** thanks to a fully responsive UI

## The project is built using:
- **TypeScript**
- **React** 
- **Next.js** 
- **Node.js** 
- **Tailwind CSS**

It connects to a **Java REST API** using **CORS** for backend
communication.

------------------------------------------------------------------------

## ⚙️ Game Flow

1.  **User registers or logs in**
2.  The user can adopt an initial set of **Beasties** (creatures)
3.  They can **feed/train** them to increase stats
4.  They select an **active team**
5.  On the **Map**, they see tiles with **random quests**
6.  They can send a Beastie to a quest → after a set time, results are
    calculated:
    -   If Beastie's stat \>= required stat → **Success**
    -   Success grants **EXP + possible items**
7.  Tasks in progress show a **progress bar**
8.  Consumable items like **candies** can be used from inventory

------------------------------------------------------------------------

## 🔌 API Connection

The frontend communicates with a Java REST API:

``` ts
fetch("http://localhost:8080/api/v1/", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  mode: "cors"
});
```

------------------------------------------------------------------------

## 🧩 Main Sections & Screenshots

### 🔐 Registration / Login

*Shows the user authentication flow.* 📸 **Screenshot Placeholder:**
`screenshots/login.png`

------------------------------------------------------------------------

### 🐾 MyBeasties

-   Lists **all your creatures**
-   Shows **active team section**

📸 `screenshots/myBeasties.png`

------------------------------------------------------------------------

### 🗺️ Map

-   Displays **active team**
-   Interactive **grid-based map**
-   Quests appear on tiles randomly

📸 `screenshots/map.png`

------------------------------------------------------------------------

### 📜 Tasks

-   Displays quests in progress
-   Shows **progress bar** for each Beastie

📸 `screenshots/tasks.png`

------------------------------------------------------------------------

### 🍬 Inventory

-   Shows **available candies / items**
-   Can be **consumed** by creatures

📸 `screenshots/inventory.png`

------------------------------------------------------------------------

## 📱 Mobile View (Responsive Design)

The UI is fully responsive and can be displayed like a **smartphone
app**.

📸 `screenshots/mobileView.png`

------------------------------------------------------------------------

## 🚀 Technologies Used

  Tech            Purpose
  --------------- ----------------
  Next.js         Main framework
  React           UI components
  Tailwind CSS    Styling
  TypeScript      Type safety
  Node.js         Runtime
  Java REST API   Backend + CORS

------------------------------------------------------------------------

## 🛠️ Installation

``` bash
npm install
npm run dev
```

Visit: `http://localhost:3000`

------------------------------------------------------------------------

## 📌 Future Improvements

-   Creature evolutions
-   Quest difficulty scaling
-   PvP battles
-   Shared world exploration

------------------------------------------------------------------------

## 📄 License

MIT License -- Free to use and modify.
