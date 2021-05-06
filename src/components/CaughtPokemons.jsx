import React from 'react';
import { connect } from 'react-redux';
import { loadCaughtPokemons } from '../store/pokemons';
import { paginate } from '../utils/paginate';
import ReactPaginate from 'react-paginate';



class CaughtPokemons extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentPage: 1,
      pageSize: 20
    };
    this.props = props;
  }

  componentDidMount() {
    this.props.dispatch(loadCaughtPokemons());
  }

  handlePageChange = page => {
    this.setState({ currentPage: page.selected + 1});
  }

  handlePokemonImage = id => {
    return `http://localhost:9002/images/${id}.png`;
  }

  aboutPokemon = id => `http://localhost:3000/pokemons/${id}`;


  render() {
    console.log(this.props.caught)

    const { pageSize, currentPage } = this.state;
    const caughtPokemons = this.props.caught;

    const pokemons = paginate(caughtPokemons, currentPage, pageSize);

    if (caughtPokemons.length === 0) return <p>You have no caught pokemons.</p>

    const pagesCount = Math.ceil(caughtPokemons.length / this.state.pageSize);



    return (
      <React.Fragment>
      <section className="pokemon mt-3">
      <h1>Caught Pokemons</h1>
      <div className="pokemon__cards m-4">
        {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon__card">
          <div className='pokemon__front'>
            <img className="pokemon__image" src={this.handlePokemonImage(pokemon.id)} alt="Pokemon"/>
              <div className="pokemon__top">
                <p className="pokemon__name">{pokemon.name}</p>
                <button className='btn btn-danger pokemon__btn pokemon__btn_disabled' disabled>Caught</button>
              </div>
              <a className="pokemon__link" target="_blank" href={this.aboutPokemon(pokemon.id)}></a>
          </div>
        </div>
      ))}
      </div>

      <nav className="mx-auto">
      <ReactPaginate
        pageCount={pagesCount}
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
     );
  }

}

const mapStateToProps = function(state) {
  return {
    caught: state.entities.pokemons.caught
  }
}
 
export default connect(mapStateToProps)(CaughtPokemons);