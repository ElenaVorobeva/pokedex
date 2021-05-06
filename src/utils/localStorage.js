export class LocalStorage {
  setPokemons = item => {
    localStorage.setItem('pokemons', JSON.stringify(item));
  };

  getPokemons = () => {
    return JSON.parse(localStorage.getItem('pokemons'));
  };

  setCaught = item => {
    localStorage.setItem('caughtPokemons', JSON.stringify(item) || '[]');
  };

  getCaught = () => {
    return JSON.parse(localStorage.getItem('caughtPokemons') || '[]');
  };

  setCurrentPage = item => {
    localStorage.setItem('currentPage', JSON.stringify(item));
  };

  getCurrentPage = () => {
    return JSON.parse(localStorage.getItem('currentPage'));
  };
}

export default LocalStorage;
