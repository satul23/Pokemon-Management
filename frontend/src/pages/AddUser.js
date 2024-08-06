import React, { useState, useEffect } from "react";
import axios from "axios";
import "../cssfiles/AddUser.css";

const AddUser = () => {
  console.log(process.env.REACT_APP_API_ENDPOINT)
  const [userName, setUserName] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [initialPositionX, setInitialPositionX] = useState("");
  const [initialPositionY, setInitialPositionY] = useState("");
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => {
        const names = response.data.results.map((pokemon) => pokemon.name);
        setPokemonList(names);
      })
      .catch((error) => console.error("Error fetching Pokémon names:", error));
  }, []);

  const fetchPokemonDetails = (pokemonName) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        const abilities = response.data.abilities.map(
          (ability) => ability.ability.name
        );
        setAbilities(abilities);
        setPokemonAbility(abilities[0] || "");
      })
      .catch((error) =>
        console.error("Error fetching Pokémon details:", error)
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userName ||
      !pokemonName ||
      !pokemonAbility ||
      !initialPositionX ||
      !initialPositionY ||
      !speed ||
      !direction
    ) {
      alert("Please fill in all fields");
      return;
    }

    const userWithPokemon = {
      name: userName,
      pokemons: [
        {
          pokemonName,
          pokemonAbility,
          initialPositionX,
          initialPositionY,
          speed,
          direction,
        },
      ],
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/users`, userWithPokemon)
      .then((response) => {
        alert("User and Pokémon added successfully");
        setUserName("");
        setPokemonName("");
        setPokemonAbility("");
        setInitialPositionX("");
        setInitialPositionY("");
        setSpeed("");
        setDirection("");
        setAbilities([]);
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div className="adduser-main-div">
      <h1 className="adduser-h1-div">Create User with Pokémon</h1>
      <form className="adduser-form-div" onSubmit={handleSubmit}>
        <div className="adduser-form-div1">
          <label>
            User Name:
            <input
              className="adduser-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="adduser-form-div1">
          <label>
            Pokémon Name:
            <select
              className="adduser-select"
              value={pokemonName}
              onChange={(e) => {
                setPokemonName(e.target.value);
                fetchPokemonDetails(e.target.value);
              }}
              required
            >
              <option value="">Select Pokémon</option>
              {pokemonList.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="adduser-form-div1">
          <label>
            Pokémon Ability:
            <select
              className="adduser-select"
              value={pokemonAbility}
              onChange={(e) => setPokemonAbility(e.target.value)}
              required
            >
              <option value="">Select Ability</option>
              {abilities.map((ability, index) => (
                <option key={index} value={ability}>
                  {ability}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="adduser-form-div1">
          <label>
            Initial Position X:
            <input
              className="adduser-input"
              type="number"
              value={initialPositionX}
              onChange={(e) => setInitialPositionX(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="adduser-form-div1">
          <label>
            Initial Position Y:
            <input
              className="adduser-input"
              type="number"
              value={initialPositionY}
              onChange={(e) => setInitialPositionY(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="adduser-form-div1">
          <label>
            Speed:
            <input
              className="adduser-input"
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="adduser-form-div1">
          <label>
            Direction:
            <input
              className="adduser-input"
              type="text"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="adduser-button-div" type="submit">
          Add User and Pokémon
        </button>
      </form>
    </div>
  );
};

export default AddUser;
