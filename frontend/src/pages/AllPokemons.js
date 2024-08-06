import React, { useState, useEffect } from "react";
import axios from "axios";
import "../cssfiles/AllPokemons.css"

const AllPokemons = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState({
    userName: "",
    pokemonName: "",
    pokemonAbility: "",
    initialPositionX: "",
    initialPositionY: "",
    speed: "",
    direction: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (userName, pokemon) => {
    setEditing(true);
    setCurrentPokemon({
      userName,
      pokemonName: pokemon.pokemonName,
      pokemonAbility: pokemon.pokemonAbility,
      initialPositionX: pokemon.initialPositionX,
      initialPositionY: pokemon.initialPositionY,
      speed: pokemon.speed,
      direction: pokemon.direction,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentPokemon({
      ...currentPokemon,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/users/${currentPokemon.userName}/pokemons/${currentPokemon.pokemonName}`,
        currentPokemon
      )
      .then((response) => {
        setUsers(
          users.map((user) => {
            if (user.name === currentPokemon.userName) {
              user.pokemons = user.pokemons.map((pokemon) => {
                if (pokemon.pokemonName === currentPokemon.pokemonName) {
                  return currentPokemon;
                }
                return pokemon;
              });
            }
            return user;
          })
        );
        setEditing(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (userName, pokemonName) => {
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}/users/${userName}/pokemons/${pokemonName}`)
      .then((response) => {
        setUsers(
          users.map((user) => {
            if (user.name === userName) {
              user.pokemons = user.pokemons.filter(
                (pokemon) => pokemon.pokemonName !== pokemonName
              );
            }
            return user;
          })
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="all-main-div">
      <h1 className="all-h1-div">All Pokemons</h1>
      <table className="all-table-div">
        <thead className="all-thread-div">
          <tr className="all-tr-div">
            <th className="all-th-div">Owner Name</th>
            <th className="all-th-div">Pokémon Name</th>
            <th className="all-th-div">Pokémon Ability</th>
            <th className="all-th-div">Initial Position X</th>
            <th className="all-th-div">Initial Position Y</th>
            <th className="all-th-div">Speed</th>
            <th className="all-th-div">Direction</th>
            <th className="all-th-div">Actions</th>
          </tr>
        </thead>
        <tbody className="all-tbody-div">
          {users.map((user) =>
            user.pokemons.map((pokemon, index) => (
              <tr className="all-tr-div" key={index}>
                <td className="all-td-div">{user.name}</td>
                <td className="all-td-div">{pokemon.pokemonName}</td>
                <td className="all-td-div">{pokemon.pokemonAbility}</td>
                <td className="all-td-div">{pokemon.initialPositionX}</td>
                <td className="all-td-div">{pokemon.initialPositionY}</td>
                <td className="all-td-div1">{pokemon.speed}</td>
                <td className="all-td-div">{pokemon.direction}</td>
                <td className="button-td">
                  <button className="all-button1-div"  onClick={() => handleEdit(user.name, pokemon)}>
                    Edit
                  </button>
                  <button
                  className="all-button2-div"
                    onClick={() => handleDelete(user.name, pokemon.pokemonName)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editing && (
        <div className="adduser-main-div">
          <h2 className="adduser-h1-div">Edit Pokemon</h2>
          <form className="adduser-form-div"  onSubmit={handleEditSubmit}>
            <label>
              Pokemon Name:
              <input
               className="adduser-select"
                type="text"
                name="pokemonName"
                value={currentPokemon.pokemonName}
                onChange={handleEditChange}
                readOnly
              />
            </label>
            <label>
              Pokemon Ability:
              <input
              className="adduser-select"
                type="text"
                name="pokemonAbility"
                value={currentPokemon.pokemonAbility}
                onChange={handleEditChange}
                required
              />
            </label>
            <label>
              Initial Position X:
              <input
              className="adduser-select"
                type="number"
                name="initialPositionX"
                value={currentPokemon.initialPositionX}
                onChange={handleEditChange}
                required
              />
            </label>
            <label>
              Initial Position Y:
              <input
              className="adduser-select"
                type="number"
                name="initialPositionY"
                value={currentPokemon.initialPositionY}
                onChange={handleEditChange}
                required
              />
            </label>
            <label>
              Speed:
              <input
              className="adduser-select"
                type="number"
                name="speed"
                value={currentPokemon.speed}
                onChange={handleEditChange}
                required
              />
            </label>
            <label>
              Direction:
              <input
              className="adduser-select"
                type="text"
                name="direction"
                value={currentPokemon.direction}
                onChange={handleEditChange}
                required
              />
            </label>
            <button className="adduser-button-div" type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllPokemons;
