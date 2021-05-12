import React from 'react';
import pokeball from '../../images/pokeball.svg';


const Loading = () => {
  return ( 
    <section className="loading d-flex justify-content-center align-items-center">
      <p className="loading__text">Loading...
        <span>
          <img className="loading__img ml-3" src={pokeball} alt="Pokeball"/>
        </span>
      </p>
    </section>
   );
}
 
export default Loading;