import React from 'react';
import { connect } from 'react-redux';
import { loadPokemons } from '../store/pokemons';

class Pokemon extends React.Component {

  constructor(props) {
    super();
    this.props = props;
  }

  componentDidMount() {
    this.props.dispatch(loadPokemons());
  }

  render() {
    return (
      <div className="pokemon__cards">
        {this.props.pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon__card">
        <p className="pokemon__name btn btn-primary m-2">{pokemon.name}</p>
      </div>
      ))}
      </div>
    )
  }

}

const mapStateToProps = function(state) {
  return {
    pokemons: state.entities.pokemons.list
  }
}
 
export default connect(mapStateToProps)(Pokemon);