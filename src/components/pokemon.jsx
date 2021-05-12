import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadPokemons } from '../store/pokemons';
import Loading from './common/Loading';


const Pokemon = (props) => {
  let { id } = useParams();
  id = Number(id);

  useEffect(() => {
    props.dispatch(loadPokemons());
  }, [])


  const pokemons = props.pokemons;

  let pokemon = pokemons.filter(item => item.id === id);
  pokemon = pokemon[0];


  const handleName = () => {
    const name = pokemon.name.split('');
    name.splice(0, 1, name[0].toUpperCase()).join();

    return name;
  }

  const handlePokemonImage = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', `http://192.168.0.105:9002/images/${id}.png`, false);
    xhr.send();

    if (xhr.status == "404") {
        return `http://192.168.0.105:9002/images/QM.svg`;
    } else {
        return `http://192.168.0.105:9002/images/${id}.png`;
    }
  }

  {if (props.loading) return <Loading />}
  {if (!props.pokemons.find(pokemon => pokemon.id === id) || !props.pokemons.length) return <p>No such pokemon in the database.</p>}

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