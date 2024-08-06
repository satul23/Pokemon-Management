import React, { useState, useEffect } from "react";
import axios from "axios";
import "../cssfiles/Playground.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [movingPokemons, setMovingPokemons] = useState({});
  const [fleeingPokemons, setFleeingPokemons] = useState({});
  const [positions, setPositions] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleUserChange = (e) => {
    const userName = e.target.value;
    setSelectedUser(userName);
    const user = users.find((user) => user.name === userName);
    setPokemons(user ? user.pokemons : []);
    setSelectedPokemon(null);
    setPositions(
      user
        ? user.pokemons.reduce((acc, pokemon) => {
            acc[pokemon.pokemonName] = {
              x: parseInt(pokemon.initialPositionX),
              y: parseInt(pokemon.initialPositionY),
            };
            return acc;
          }, {})
        : {}
    );
  };

  const handlePokemonChange = (e) => {
    const pokemonName = e.target.value;
    setSelectedPokemon(pokemonName);
  };

  const handlePokemonGo = () => {
    if (selectedPokemon) {
      setMovingPokemons({ [selectedPokemon]: true });
    }
  };

  const handlePokemonFlee = () => {
    if (selectedPokemon) {
      setFleeingPokemons((prevState) => ({
        ...prevState,
        [selectedPokemon]: !prevState[selectedPokemon],
      }));
    }
  };

  const handlePokemonCease = () => {
    setMovingPokemons({});
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prevPositions) => {
        const newPositions = { ...prevPositions };
        if (selectedPokemon && movingPokemons[selectedPokemon]) {
          const pokemon = pokemons.find(
            (p) => p.pokemonName === selectedPokemon
          );
          const angle = pokemon.direction * (Math.PI / 180);
          newPositions[selectedPokemon].x += pokemon.speed * Math.cos(angle);
          newPositions[selectedPokemon].y += pokemon.speed * Math.sin(angle);

          if (
            newPositions[selectedPokemon].x < 0 ||
            newPositions[selectedPokemon].x > 800 ||
            newPositions[selectedPokemon].y < 0 ||
            newPositions[selectedPokemon].y > 600
          ) {
            newPositions[selectedPokemon].visible = false;
          } else {
            newPositions[selectedPokemon].visible = true;
          }
        }
        return newPositions;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pokemons, movingPokemons, selectedPokemon]);

  const getPokemonStyle = (pokemon) => {
    const position = positions[pokemon.pokemonName] || {
      x: 0,
      y: 0,
      visible: true,
    };
    const isFleeing = fleeingPokemons[pokemon.pokemonName];
    return {
      position: "absolute",
      left: `${position.x}px`,
      top: `${position.y}px`,
      display: isFleeing || !position.visible ? "none" : "block",
    };
  };

  return (
    <div className="main-playground-div">
      <div className="play-user-div">
        <h1 className="play-h1-div">Pokémon Playground</h1>
        <div className="label-select-div">
        <label>Select User: </label>
        <select className="adduser-select1" onChange={handleUserChange}>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        </div>
      </div>

      {selectedUser && (
        <div className="label-select-div">
          <label>Select Pokémon: </label>
          <select className="adduser-select1" onChange={handlePokemonChange}>
            <option value="">Select a Pokémon</option>
            {pokemons.map((pokemon) => (
              <option key={pokemon.pokemonName} value={pokemon.pokemonName}>
                {pokemon.pokemonName}
              </option>
            ))}
          </select>
        </div>
      )}
        <div className="play-buttons">
        <button className="play-buttons-div1" onClick={handlePokemonGo} disabled={!selectedPokemon}>
        Pokémon Go
        </button>
        <button className="play-buttons-div2" onClick={handlePokemonFlee} disabled={!selectedPokemon}>
       Pokémon Flee
        </button>
        <button  className="play-buttons-div3" onClick={handlePokemonCease} disabled={!selectedPokemon}>
        Pokémon Cease
        </button>
      </div>

    <div className="play-main-box">
      {selectedUser && selectedPokemon && (

        <div className="play-box">
          {pokemons.map((pokemon) => (
            <div key={pokemon.pokemonName} style={getPokemonStyle(pokemon)}>
              {pokemon.pokemonName}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;
