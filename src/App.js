import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import CaughtPokemons from './components/CaughtPokemons';
import NavBar from './components/navbar';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/pokemons" component={Home}></Route>
        <Route path="/caught-pokemons" component={CaughtPokemons}></Route>
        <Redirect from="/" exact to="/pokemons"></Redirect>
      </Switch>
    </React.Fragment>
  );
}

export default App;
