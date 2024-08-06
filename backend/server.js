const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const usersFilePath = "./users.json";

// Function to read users from the JSON file
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return data ? JSON.parse(data) : [];
};

// Function to write users to the JSON file
const writeUsers = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), "utf-8");
};

// Route to get all users
app.get("/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// Route to add a new user
app.post("/users", (req, res) => {
  const users = readUsers();
  const newUser = req.body;

  if (users.find((user) => user.name === newUser.name)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// Route to add a new pokemon to a user
app.post("/users", (req, res) => {
  const users = readUsers();
  const newUser = req.body;

  if (users.find((user) => user.name === newUser.name)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// Route to update a pokemon for a user
app.put("/users/:userName/pokemons/:pokemonName", (req, res) => {
  const { userName, pokemonName } = req.params;
  const updatedPokemon = req.body;

  const users = readUsers();
  const user = users.find((user) => user.name === userName);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const pokemonIndex = user.pokemons.findIndex(
    (pokemon) => pokemon.pokemonName === pokemonName
  );
  if (pokemonIndex === -1) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  user.pokemons[pokemonIndex] = updatedPokemon;
  writeUsers(users);
  res.status(200).json(updatedPokemon);
});

// Route to delete a pokemon from a user
app.delete("/users/:userName/pokemons/:pokemonName", (req, res) => {
  const { userName, pokemonName } = req.params;

  const users = readUsers();
  const user = users.find((user) => user.name === userName);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.pokemons = user.pokemons.filter(
    (pokemon) => pokemon.pokemonName !== pokemonName
  );
  writeUsers(users);
  res.status(204).send();
});

app.get("/users/:userName", (req, res) => {
  const userName = req.params.userName;
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading users file");
    const users = JSON.parse(data);
    const user = users.find((u) => u.name === userName);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  });
});

app.post("/add-pokemon", (req, res) => {
  const { userName, newPokemon } = req.body;

  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading users file");

    const users = JSON.parse(data);
    const user = users.find((user) => user.name === userName);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.pokemons.push(newPokemon);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving users file");
      res.send("Pokémon added successfully");
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
