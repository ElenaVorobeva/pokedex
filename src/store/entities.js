import { combineReducers } from 'redux';

import pokemonReducer from './pokemons';

export default combineReducers({
  pokemons: pokemonReducer,
});
