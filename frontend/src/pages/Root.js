import React from "react";
import "../cssfiles/Root.css";
import pokemonvid from "../pokemonroot.mp4";

const Root = ({ navigateTo }) => {
  return (
    <div className="root-main-div">
      <video
        className="root-video"
        muted
        autoPlay
        loop
        src={pokemonvid}
      ></video>
      <h1 className="root-h1-div">Welcome to the Pokémon Management System</h1>
      <div className="root-button-div">
        <button
          className="root-button1-div"
          onClick={() => navigateTo("/add-user")}
        >
          Add User
        </button>
        <button
          className="root-button1-div"
          onClick={() => navigateTo("/add-pokemon")}
        >
          Add Pokemons
        </button>
        <button
          className="root-button1-div"
          onClick={() => navigateTo("/all-pokemons")}
        >
          All Pokemons
        </button>
        <button
          className="root-button1-div"
          onClick={() => navigateTo("/home")}
        >
          Playground
        </button>
      </div>
    </div>
  );
};

export default Root;
