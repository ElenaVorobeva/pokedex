import React from 'react';
import { connect } from 'react-redux';
import { loadPokemons, catchPokemon } from '../store/pokemons';
// import Pagination from './common/pagination'
import { paginate } from '../utils/paginate';
import Pagination from "react-js-pagination";



class Pokemon extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentPage: 1,
      pageSize: 5,
    };
    this.props = props;
  }

  componentDidMount = () => {
    this.props.dispatch(loadPokemons());
  }

  handlePageChange = page => {
    this.setState({ currentPage: page});
  }

  handlePrevPage = () => {
    this.setState({currentPage: this.state.currentPage - 1})
  }

  handleNextPage = () => {
    this.setState({currentPage: this.state.currentPage + 1})
  }

  handleCatchButton = (id, pokemon) => {
    this.props.dispatch(catchPokemon(id));
  }

  render() {
    const { pageSize, currentPage } = this.state;
    const pokemons = paginate(this.props.pokemons, currentPage, pageSize);
    const pokemonsCount = Math.ceil(this.props.pokemons.length / this.state.pageSize);
    if (this.props.pokemons.length === 0) return <p>There are no pokemons in database.</p>

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
      <div>
      <Pagination

      activePage={this.state.currentPage}
      itemsCountPerPage={this.state.pageSize}
      totalItemsCount={pokemonsCount}
      pageRangeDisplayed={5}
      onChange={this.handlePageChange.bind(this)}

        // itemsCount={this.props.pokemons.length}
        // pageSize={pageSize}
        // currentPage={currentPage}
        // onPageChange={this.handlePageChange}
        // onPrev={this.handlePrevPage}
        // onNext={this.handleNextPage}
      />
      </div>
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