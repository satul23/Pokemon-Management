# Pokémon Management Application

## Description

This Pokémon Management Application is built using ReactJS for the frontend and Node.js with Express for the backend. The application allows users to add Pokémon to their profile, view their Pokémon, and perform various actions like moving, fleeing, and ceasing the Pokémon.

## Features

- Add users and their Pokémon
- View list of users and their Pokémon
- Move Pokémon with specified speed and direction
- Toggle Pokémon visibility (flee/cease)

## Installation

### Prerequisites

- Node.js and npm installed on your machine

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pokemon-management.git
   cd pokemon-management
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Running the application

### Backend

1. Start the backend server:

   ```bash
   cd backend
   node server.js
   ```

### Frontend

1.  Start the frontend development server:

        ```bash
        cd frontend
        npm start
        ```

2.  Open your browser and navigate to http://localhost:3000.

## Detailed Code Explanation

### Backend (server.js)

The backend is a simple Express server that handles CRUD operations for users and their Pokémon. The data is stored in JSON files (users.json and data.json).

1. GET /users: Fetches all users.
2. GET /users/:name: Fetches a specific user by name.
3. POST /users: Adds a new user.
4. PUT /users/:name: Updates an existing user.
5. DELETE /users/:name: Deletes a user.

### Frontend

The frontend is built using ReactJS. It consists of the following components:

#### App.js

The main component that includes routing for different pages like Home, AddUser, AddPokemon, and AllPokemons.

#### Home.js

Displays the home page where you can select a user from a dropdown. Based on the selected user, it lists all their Pokémon in a div container. It includes buttons to move, flee, and cease Pokémon.

Key functions:

handleMove: Starts moving the Pokémon.
movePokemon: Moves Pokémon based on speed and direction using direct DOM manipulation (getElementById).
handleFlee: Toggles Pokémon visibility.
handleCease: Stops Pokémon movement.

#### AddUser.js

Allows adding a new user with Pokémon details.

Key functions:

handleAddUser: Adds a new user by making a POST request to the backend.

#### AddPokemon.js

Allows adding a new Pokémon to an existing user.

Key functions:

handleAddPokemon: Adds a new Pokémon to the selected user by making a PUT request to the backend.

#### AllPokemons.js

Displays a list of all Pokémon for all users in a tabular form, including options to edit and delete Pokémon.

Key functions:

handleDelete: Deletes a Pokémon from a user.
handleEdit: (To be implemented) Edits a Pokémon's details.

#### Data Storage

users.json: Stores user details along with their Pokémon.

### Running the Application

Ensure the backend server is running (node server.js).
Ensure the frontend server is running (npm start).
Navigate to http://localhost:3000 to interact with the application.

## Conclusion

This Pokémon Management Application demonstrates CRUD operations, state management, and basic animations using React and Node.js. Feel free to extend the functionality and improve the user interface as needed.
