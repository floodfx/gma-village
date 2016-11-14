import React, { Component } from 'react';
import { Link } from 'react-router';
import './GmasList.css'

class GmasList extends Component {

  componentWillReceiveProps(newProps) {
    console.log("newProps", newProps)
  }

  render = () => {
    return (
      <div>
        {this.props.gmas.map(this.renderProfileThumbnail)}
      </div>
    );
  }

  renderProfileThumbnail = (gma) => {
    return (
      <div key={gma.id} className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src="http://placekitten.com/320/240" alt="gmas placeholder"/>
          <div className="caption">
            <h3><span style={{color: '#f37441'}}>Gma {gma.first_name}</span> <a className="pullRight" href="#">{gma.phone}</a></h3>

            Availability
            <ul>
              {gma.availabilities.map((avail) => {
                return <li key={avail}>{this.capitalizeWords(avail)}</li>
              })}
            </ul>
            Neighborhood
            <ul>
              {this.capitalizeWords(gma.neighborhood)}
            </ul>
            <Link className="btn" to={`/gma/${gma.id}`}>More info...</Link>
          </div>
        </div>
      </div>
    )
  }


  capitalizeWords = (word) => {
    return <span style={{textTransform:'capitalize'}}>{word.toLowerCase().replace('_', " ")}</span>
  }

}

export default GmasList
