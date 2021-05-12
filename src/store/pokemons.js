import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'pokemons',

  initialState: {
    list: [],
    caught: [],
    loading: false,
    lastFetch: null,
    catchPokemonLoading: false,
    handleCatchingPokemon: false,
  },

  reducers: {
    pokemonsRequested: pokemons => {
      pokemons.loading = true;
    },

    pokemonsRecieved: (pokemons, action) => {
      const index = pokemons.list.findIndex(
        pokemon => pokemon.id === action.payload.id
      );

      pokemons.list = action.payload;
      pokemons.loading = false;
      pokemons.lastFetch = Date.now();
    },

    pokemonsRequestFailed: pokemons => {
      pokemons.loading = false;
    },

    caughtPokemonsRequested: pokemons => {
      pokemons.loading = true;
    },

    caughtPokemonsRecieved: (pokemons, action) => {
      pokemons.caught = action.payload;
      pokemons.loading = false;
    },

    caughtPokemonsRequestFailed: pokemons => {
      pokemons.loading = false;
    },

    catchPokemonRequested: pokemons => {
      pokemons.catchPokemonLoading = true;
    },

    pokemonCaught: (pokemons, action) => {
      pokemons.catchPokemonLoading = false;
      const index = pokemons.list.findIndex(
        pokemon => pokemon.id === action.payload.id
      );

      pokemons.list[index] = action.payload;
    },

    catchPokemonFailed: pokemons => {
      pokemons.catchPokemonLoading = false;
    },

    handleCaughtPokemonRequested: pokemons => {
      pokemons.handleCatchingPokemon = true;
    },

    CaughtPokemonHandled: (pokemons, action) => {
      pokemons.handleCatchingPokemon = false;
      pokemons.caught.push(action.payload);
    },

    handleCaughtPokemonFailed: pokemons => {
      pokemons.catchPokemonLoading = false;
    },
  },
});

const {
  pokemonsRecieved,
  pokemonsRequested,
  pokemonsRequestFailed,
  caughtPokemonsRequested,
  caughtPokemonsRecieved,
  caughtPokemonsRequestFailed,
  catchPokemonRequested,
  pokemonCaught,
  catchPokemonFailed,
  handleCaughtPokemonRequested,
  CaughtPokemonHandled,
  handleCaughtPokemonFailed,
} = slice.actions;
export default slice.reducer;

const url = '/api/pokemons';
const caughtPokemonsUrl = 'api/caughtPokemons';

export const loadPokemons = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.pokemons;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: pokemonsRequested.type,
      onSuccess: pokemonsRecieved.type,
      onError: pokemonsRequestFailed.type,
    })
  );
};

export const loadCaughtPokemons = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: caughtPokemonsUrl,
      onStart: caughtPokemonsRequested.type,
      onSuccess: caughtPokemonsRecieved.type,
      onError: caughtPokemonsRequestFailed.type,
    })
  );
};

export const handleCaughtPokemon = pokemon => dispatch => {
  dispatch(
    apiCallBegan({
      url: caughtPokemonsUrl,
      method: 'post',
      data: pokemon,
      onStart: handleCaughtPokemonRequested.type,
      onSuccess: CaughtPokemonHandled.type,
      onError: handleCaughtPokemonFailed.type,
    })
  );
};

export const catchPokemon = pokemon => (dispatch, getState) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  dispatch(
    apiCallBegan({
      url: url + '/' + pokemon.id,
      method: 'patch',
      data: {
        isCaught: true,
        catchTime: new Date(Date.now()).toLocaleString('en-US', options),
      },
      onStart: catchPokemonRequested.type,
      onSuccess: pokemonCaught.type,
      onError: catchPokemonFailed.type,
    })
  );
};
