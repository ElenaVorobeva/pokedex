import React from 'react';
import { connect } from 'react-redux';
import { loadPokemons, catchPokemon } from '../store/pokemons';
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

  render() {
    const { pageSize, currentPage } = this.state;
    const pokemons = paginate(this.props.pokemons, currentPage, pageSize);
    if (this.props.pokemons.length === 0) return <p>There are no pokemons in database.</p>

    // const pagesCount = Math.ceil(this.props.pokemons.length / this.state.pageSize);

    return (
      <React.Fragment>
      <div className="pokemon__cards">
        {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon__card">
        <p className="pokemon__name btn btn-primary m-2">{pokemon.name}</p>
        <button className={pokemon.isCaught ? 'btn btn-danger disabled' : 'btn btn-danger'} disabled={pokemon.isCaught} onClick={() => this.handleCatchButton(pokemon.id, pokemon)}>Catch</button>
      </div>
      ))}
      </div>




      <nav>
      <ReactPaginate
        pageCount={Math.ceil(this.props.pokemons.length / this.state.pageSize)}
        pageRangeDisplayed={11}
        marginPagesDisplayed={3}
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