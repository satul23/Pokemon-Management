import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AddPokemon from "./pages/AddPokemon";
import AllPokemons from "./pages/AllPokemons";
import AddUser from "./pages/AddUser";
import Root from "./pages/Root";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootWithRouting />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-pokemon" element={<AddPokemon />} />
        <Route path="/all-pokemons" element={<AllPokemons />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
};

const RootWithRouting = () => {
  const navigate = useNavigate();
  return <Root navigateTo={navigate} />;
};

export default App;
