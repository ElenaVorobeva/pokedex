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

    pokemonCaught: (pokemons, action) => {
      const index = pokemons.list.findIndex(
        pokemon => pokemon.id === action.payload.id
      );

      pokemons.list[index] = action.payload;
    },

    caughtPokemonHandled: (pokemons, action) => {
      pokemons.caught.push(action.payload);
    },
  },
});

const {
  pokemonsRecieved,
  pokemonsRequested,
  pokemonsRequestFailed,
  pokemonCaught,
  caughtPokemonsRequested,
  caughtPokemonsRecieved,
  caughtPokemonsRequestFailed,
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
      onSuccess: pokemonCaught.type,
    })
  );
};

export const handleCaughtPokemon = pokemon => dispatch => {
  dispatch(
    apiCallBegan({
      url: caughtPokemonsUrl,
      method: 'post',
      data: pokemon,
    })
  );
};
