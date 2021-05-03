import React from 'react';
import { connect } from 'react-redux';
import { loadPokemons, catchPokemon, getPokemonImage } from '../store/pokemons';
import { paginate } from '../utils/paginate';
import ReactPaginate from 'react-paginate';



class Pokemon extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentPage: 1,
      pageSize: 20,
    };
    this.props = props;
  }

  componentDidMount = () => {
    this.props.dispatch(loadPokemons());
  }

  handlePageChange = page => {
    this.setState({ currentPage: page.selected + 1});
  }

  handleCatchButton = (id) => {
    this.props.dispatch(catchPokemon(id));
  }

  handlePokemonImage = id => {
    return `http://localhost:9002/images/${id}.png`;

  }

  render() {
    const { pageSize, currentPage } = this.state;
    const pokemons = paginate(this.props.pokemons, currentPage, pageSize);
    if (this.props.pokemons.length === 0) return <p>There are no pokemons in database.</p>

    const pokeball = 'http://localhost:9002/images/pokeball.svg'

    return (
      <React.Fragment>
        <section className='pokemon'>
      <div className="pokemon__cards">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="pokemon__card">
          <img className="pokemon__image" src={this.handlePokemonImage(pokemon.id)} alt="Pokemon"/>
          <div className="pokemon__card-top">
          <p className="pokemon__name">{pokemon.name}</p>
          <button className={pokemon.isCaught ? 'btn btn-danger pokemon__btn disabled' : 'btn btn-danger pokemon__btn rounded'} disabled={pokemon.isCaught} onClick={() => this.handleCatchButton(pokemon.id, pokemon)}>Catch</button>
          </div>
      </div>
      ))}
      </div>




      <nav>
      <ReactPaginate
        pageCount={Math.ceil(this.props.pokemons.length / this.state.pageSize)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel={'Prev'}
        nextLabel={'Next'}
        onPageChange={this.handlePageChange}

        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        pageClassName='page-item'
        previousClassName='page-item'
        nextClassName='page-item'
        pageLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        activeClassName='active'
        />
      </nav>
      </section>
      </React.Fragment>
      
    )
  }

}

const mapStateToProps = function(state) {
  return {
    pokemons: state.entities.pokemons.list
  }
}
 
export default connect(mapStateToProps)(Pokemon);