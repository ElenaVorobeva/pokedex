import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'pokemons',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    pokemonsRequested: (pokemons, action) => {
      pokemons.loading = true;
    },

    pokemonsRecieved: (pokemons, action) => {
      pokemons.list = action.payload;
      pokemons.loading = false;
      pokemons.lastFetch = Date.now();
    },

    pokemonsRequestFailed: (pokemons, action) => {
      pokemons.loading = false;
    },

    pokemonCaught: (pokemons, action) => {
      const index = pokemons.list.findIndex(
        pokemon => pokemon.id === action.payload.id
      );
      pokemons.list[index].isCaught = true;
    },
  },
});

export const {
  pokemonAdded,
  pokemonsRecieved,
  pokemonsRequested,
  pokemonsRequestFailed,
  pokemonCaught,
} = slice.actions;
export default slice.reducer;

const url = '/pokemons';

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

export const catchPokemon = id =>
  apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: { isCaught: true },
    onSuccess: pokemonCaught.type,
  });

export const getCaughtPokemons = createSelector(
  state => state.entities.pokemons,
  pokemons => pokemons.list.filter(pokemon => pokemon.isCaught)
);
