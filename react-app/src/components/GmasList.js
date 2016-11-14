import React, { Component } from 'react';
import { Link } from 'react-router';
import capitalizeWords from './formatutil'
import './GmasList.css'
import imgUrl from './ImageUrl'

class GmasList extends Component {

  componentWillReceiveProps(newProps) {
    console.log("newProps", newProps)
  }

  render() {
    if(this.props.loading) {
      return <div>Loading... </div>
    }
    else {
      return (
        <div>
          {this.props.gmas.map(this.renderProfileThumbnail)}
        </div>
      );
    }
  }

  renderProfileThumbnail = (gma) => {
    return (
      <div key={gma.id} className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src={imgUrl(gma)} alt="gmas placeholder" width="150" height="180"/>
          <div className="caption">
            <h3><span style={{color: '#f37441'}}>Gma {gma.first_name}</span> <a className="pullRight" href="#">{gma.phone}</a></h3>

            Availability
            <ul>
              {gma.availabilities.map((avail) => {
                return <li key={avail}>{capitalizeWords(avail)}</li>
              })}
            </ul>
            Neighborhood
            <ul>
              {capitalizeWords(gma.neighborhood)}
            </ul>
            <Link className="btn" to={`/gma/${gma.id}`}>More info...</Link>
          </div>
        </div>
      </div>
    )
  }


}

export default GmasList
