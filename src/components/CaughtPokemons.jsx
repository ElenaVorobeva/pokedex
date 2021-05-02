import React from 'react';
import { connect } from 'react-redux';
import { loadPokemons } from '../store/pokemons';
import { paginate } from '../utils/paginate';
import ReactPaginate from 'react-paginate';



class CaughtPokemons extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentPage: 1,
      pageSize: 5
    };
    this.props = props;
  }

  componentDidMount() {
    this.props.dispatch(loadPokemons());
  }

  handlePageChange = page => {
    this.setState({ currentPage: page.selected});
  }

  render() {    
    const { pageSize, currentPage } = this.state;
    const caughtPokemons = this.props.caught;
    const pokemons = paginate(caughtPokemons, currentPage, pageSize);

    if (caughtPokemons.length === 0) return <p>You have no caught pokemons.</p>

    const pagesCount = Math.ceil(this.props.caught.length / this.state.pageSize);



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

      <nav>
      <ReactPaginate
        pageCount={pagesCount}
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