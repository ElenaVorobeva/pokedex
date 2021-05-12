import React from 'react';
import { NavLink } from "react-router-dom";

const NavBar = () => {
return ( 
<nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li
            className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/pokemons"
            >
              Home
            </NavLink>
          </li>

          <li
            className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/caught-pokemons"
            >
              Caught Pokemons
            </NavLink>
          </li>

        </ul>
      </div>

    </nav>
  );
}
 
export default NavBar;
