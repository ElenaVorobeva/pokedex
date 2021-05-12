import React from 'react';
import { connect } from 'react-redux';
import { loadPokemons, catchPokemon, handleCaughtPokemon } from '../store/pokemons';
import { paginate } from '../utils/paginate';
import ReactPaginate from 'react-paginate';
import Loading from './common/Loading';

class Pokemons extends React.Component {

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


  handleCatchButton = (pokemon) => {
    this.props.dispatch(catchPokemon(pokemon));
    this.props.dispatch(handleCaughtPokemon(pokemon));
}

  handlePokemonImage = id => {
    return `http://192.168.0.105:9002/images/${id}.png`;
  }

  handlePokemonImageError = (e) => {
    e.target.src = "http://192.168.0.105:9002/images/QM.svg";
  }

  render() {

    if (this.props.loading) return <Loading />
    if (this.props.pokemons.length === 0) return <p>No pokemons in the database.</p>

    const storedPokemons = this.props.pokemons;

    const { pageSize, currentPage } = this.state;
    const pokemons = paginate(storedPokemons, currentPage, pageSize);

    const aboutPokemon = (id) => `http://192.168.0.105:3000/pokemons/${id}`

    return (
      <React.Fragment>
        <section className='pokemon mt-3'>
        <h1>Pokemons</h1>
          <div className="pokemon__cards mb-5">
            {pokemons.map((pokemon, index) => (
              <div key={index} className="pokemon__card">
                <div className={pokemon.isCaught ? 'pokemon__inner pokemon__rotate' : 'pokemon__inner'}>
                  <div className="pokemon__front">
                    <img className="pokemon__image" src={this.handlePokemonImage(pokemon.id)} alt="Pokemon" onError={this.handlePokemonImageError}/>
                    <div className="pokemon__top">
                      <p className="pokemon__name">{pokemon.name}</p>
                      <button className='btn btn-danger pokemon__btn pokemon__btn_hover' onClick={() => this.handleCatchButton(pokemon)}>Catch</button>
                    </div>
                    <a className="pokemon__link" target="_blank" href={aboutPokemon(pokemon.id)}></a>
                </div>

                  <div className="pokemon__back">
                    <img className="pokemon__image" src={this.handlePokemonImage(pokemon.id)} alt="Pokemon" onError={this.handlePokemonImageError}/>
                    <div className="pokemon__top">
                      <p className="pokemon__name">{pokemon.name}</p>
                      <button className='btn btn-danger pokemon__btn pokemon__btn_disabled' disabled>Caught</button>
                    </div>
                    <a className="pokemon__link" target="_blank" href={aboutPokemon(pokemon.id)}></a>
                  </div>
                </div>            
              </div>
            ))}
      </div>




      <nav className="mx-auto">
      <ReactPaginate
        pageCount={Math.ceil(this.props.pokemons.length / this.state.pageSize)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel={'<'}
        nextLabel={'>'}
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
    pokemons: state.entities.pokemons.list,
    caught: state.entities.pokemons.caught,
    loading: state.entities.pokemons.loading,
  }
}
 
export default connect(mapStateToProps)(Pokemons);