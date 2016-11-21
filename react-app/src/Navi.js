import logo from './assets/logo.png'
import React from 'react';
import { Link } from 'react-router';
import './Navi.css'



const Navi = () => (
  <div className="row">
    <nav className="navbar">
      <div className="navbar-header">
        <button type="button" className="gma-orange-bg navbar-toggle"
                data-toggle="collapse" data-target="#gma-navbar-collapse"
                aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="http://www.gmavillage.com">
          <img className="img-responsive" src={logo} alt="Gma Village Logo" style={{maxHeight: '90px'}}/>
        </a>
      </div>
      <div className="collapse navbar-collapse" id="gma-navbar-collapse">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a className="navbar-link" href="http://www.gmavillage.com">The Gma Village</a>
            <span className="delimiter">/</span>
          </li>
          <li className="nav-item">
            <a className="navbar-link" href="http://www.gmavillage.com/about/">About</a>
            <span className="delimiter">/</span>
          </li>
          <li className="nav-item">
            <Link activeClassName="active" className="navbar-link" to="/gmas">Gmas</Link>
            <span className="delimiter">/</span>
          </li>
          <li className="nav-item">
            <a className="navbar-link" href="http://www.gmavillage.com/photos/">Photo Gallery</a>
            <span className="delimiter">/</span>
          </li>
          <li className="nav-item">
            <a className="navbar-link" href="http://www.gmavillage.com/our-team/">Our Team</a>
            <span className="delimiter">/</span>
          </li>
          <li className="nav-item">
            <a className="navbar-link" href="http://www.gmavillage.com/gma-village/">Blog</a>
            <span className="delimiter">/</span>
          </li>
          <li className="nav-item">
            <a className="navbar-link" href="http://www.gmavillage.com/contactus/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
)

export default Navi
