import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadPokemons } from '../store/pokemons';


const Pokemon = (props) => {
  let { id } = useParams();
  id = Number(id);

  useEffect(() => {
    props.dispatch(loadPokemons());
  }, [])


  const pokemons = props.pokemons;
  console.log(pokemons); 

  let pokemon = pokemons.filter(item => item.id === id);
  pokemon = pokemon[0];
  console.log(pokemon);


  const handleName = () => {
    const name = pokemon.name.split('');
    name.splice(0, 1, name[0].toUpperCase()).join();

    return name;
  }

  const handlePokemonImage = () => {
    return `http://localhost:9002/images/${id}.png`;

  }

  {if (props.loading || props.pokemons.length === 0) return <p>Loading...</p>}
  {if (!props.pokemons.find(pokemon => pokemon.id === id)) return <p>No such pokemon in the database.</p>}

  return (
    <React.Fragment>
      <section className="about mt-5">
      <div className="about__image-bg"></div>
        <div className="about__info mt-5">
          <h1 className="about__title mb-4">{handleName()}</h1>
          <p className="about__status">Status: {pokemon.isCaught ? 'Caught' : 'Free'}</p>
          <p className="about__time">{pokemon.isCaught ? 'Caught: ' + pokemon.catchTime : ''}</p>
        </div>
        <div className="about__image">
          <img src={handlePokemonImage()} alt="Pokemon" className="about__photo"/>
        </div>
      </section>
    </React.Fragment>
  );
}
 
const mapStateToProps = function(state) {
  return {
    pokemons: state.entities.pokemons.list,
    loading: state.entities.pokemons.loading
  }
}
 
export default connect(mapStateToProps)(Pokemon);