import React from 'react';
import { connect } from 'react-redux';
import { loadPokemons } from '../store/pokemons';
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate';



class CaughtPokemons extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentPage: 1,
      pageSize: 2
    };
    this.props = props;
  }

  componentDidMount() {
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


  render() {    
    const { pageSize, currentPage } = this.state;
    const caughtPokemons = this.props.caught;
    const pokemons = paginate(caughtPokemons, currentPage, pageSize);

    if (caughtPokemons.length === 0) return <p>You have no caught pokemons.</p>

    return (
      <React.Fragment>
      <h1>Caught Pokemons</h1>
      <div className="pokemon__cards">
        {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon__card">
        <p className="pokemon__name btn btn-primary m-2">{pokemon.name}</p>
      </div>
      ))}
      </div>
      <Pagination
        itemsCount={caughtPokemons.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={this.handlePageChange}
        onPrev={this.handlePrevPage}
        onNext={this.handleNextPage}

      />
      </React.Fragment>
     );
  }

}

const mapStateToProps = function(state) {
  return {
    pokemons: state.entities.pokemons.list,
    caught: state.entities.pokemons.caught
  }
}
 
export default connect(mapStateToProps)(CaughtPokemons);