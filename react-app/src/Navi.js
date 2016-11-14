import logo from './assets/logo.png'
import React from 'react';
import { Link } from 'react-router';
import './Navi.css'



const Navi = () => (
  <nav className="navbar">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="Gma Village Logo" width="164" height="90"/>
    </Link>
    <ul className="nav navbar-nav" >
      <li className="nav-item">
        <Link className="navbar-link" to="/" style={{lineHeight: '96px'}}>Home</Link>
      </li>
      <li className="nav-item">
        <Link className="navbar-link" to="/gmas" style={{lineHeight: '96px'}}>Gmas</Link>
      </li>
    </ul>
  </nav>
)


export default Navi
