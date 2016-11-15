import logo from './assets/logo.png'
import React from 'react';
import { Link } from 'react-router';
import './Navi.css'



const Navi = () => (
  <nav className="navbar" style={{paddingBottom: '50px'}}>
    <div className="navbar-header">
      <Link className="navbar-brand" to="/" >
        <img className="img-responsive" src={logo} alt="Gma Village Logo" style={{maxHeight: '100px'}}/>
      </Link>
    </div>
    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav" >
        <li className="nav-item">
          <Link className="navbar-link" to="/" style={{lineHeight: '100px'}}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="navbar-link" to="/gmas" style={{lineHeight: '100px'}}>Gmas</Link>
        </li>
      </ul>
    </div>
  </nav>
)


export default Navi
