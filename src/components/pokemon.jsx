import React from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadPokemons } from '../store/pokemons';


const Pokemon = (props) => {
  const { id } = useParams();
  const history = useHistory();

  props.dispatch(loadPokemons());

  const handleUrl = (e) => {
    id && history.push(`/${id}`);
  };

  const handleName = () => {
    return props.pokemons[id].name;
  }

  const handlePokemonImage = () => {
    return `http://localhost:9002/images/${id}.png`;

  }



  {if (props.pokemons.length === 0) return <p>Loading...</p>}
  {if (id > props.pokemons.length) return <p>No such pokemon in the database.</p>}

  return (
    <React.Fragment>
      <section className="about">
        <h1 className="about__title">{handleName()}</h1>
        <img src={handlePokemonImage()} alt="Pokemon" className="about__image"/>
        <p className="about__status"></p>
      </section>
    </React.Fragment>
  );
}
 
const mapStateToProps = function(state) {
  return {
    pokemons: state.entities.pokemons.list
  }
}
 
export default connect(mapStateToProps)(Pokemon);