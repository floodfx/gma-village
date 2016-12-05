import React, { Component } from 'react';
import { Link } from 'react-router';
import { capitalizeWords, formatPhone }  from './formatutil'
import imgUrl from './ImageUrl'

class GmasList extends Component {

  render() {
    if(this.props.loading) {
      return <div>Loading... </div>
    }
    else {
      const atLeastOneGma = this.props.gmas.length > 0
      return (
        <div>
          <div className="col-md-12 col-sm-8 gma-orange-border">
          <h1 className="gma-orange">Gmas <span className="badge">{this.props.gmas.length}</span></h1>
          {!atLeastOneGma &&
            <div className="alert alert-warning" role="alert">
              <strong>Uh oh...</strong> Your filters are too strict. Try using less filters.
            </div>
          }
          {atLeastOneGma &&
            this.props.gmas.map(this.renderProfileThumbnail)
          }
          </div>
        </div>
      );
    }
  }

  renderProfileThumbnail = (gma) => {
    return (
      <div key={gma.id} className="col-sm-6 col-md-3" style={{minHeight: "575px"}}>
        <div className="thumbnail">
          <Link to={`/gma/${gma.id}`}>
            <img className="img-rounded img-responsive gma-orange-border" style={{objectFit: 'cover', maxWidth: '135px', maxHeight: '135px', minWidth: '135px', minHeight: '135px'}} src={imgUrl(gma)} alt="gmas placeholder"/>
          </Link>
          <div className="caption">
            <h3 className="gma-orange text-center gma-font">Gma {gma.first_name}</h3>
            <div className="text-center">
              <a className="btn gma-orange-bg" href={"tel:"+gma.phone}>{formatPhone(gma.phone)}</a>
            </div>
            <div className="text-center" style={{marginTop: '30px'}}>
              <p style={{fontWeight:"bold"}}>Availability</p>
              <ul style={{display:"inline", padding: 0}}>
                {gma.availabilities.map((avail) => {
                  return <li style={{listStyleType:"none"}} key={avail}>{capitalizeWords(avail)}</li>
                })}
              </ul>
            </div>
            <div className="text-center" style={{marginTop: '20px'}}>
              <p style={{fontWeight:"bold"}}>Neighborhood</p>
              <ul style={{display:"inline", padding: 0}}>
                <li style={{listStyleType:"none"}}>{capitalizeWords(gma.neighborhood)}</li>
                {gma.isAvailableOutsideNeighborhood &&
                  <li style={{listStyleType:"none"}}>Willing to travel</li>
                }
              </ul>
            </div>
            <div style={{marginTop: '30px'}} className="text-center">
              <Link to={`/gma/${gma.id}`}>Read More &rarr;</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default GmasList
