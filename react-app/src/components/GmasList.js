import React, { Component } from 'react';
import { Link } from 'react-router';
import { capitalizeWords, formatPhone }  from './formatutil'
import imgUrl from './ImageUrl'
import {
  Neighborhood
} from 'gma-village-data-model';

class GmasList extends Component {

  render() {
    console.log("props", this.props)
    if(this.props.loading) {
      return <div>Loading... </div>
    }
    else {
      const atLeastOneGma = this.props.gmas.length > 0
      return (
        <div>
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
      );
    }
  }

  renderProfileThumbnail = (gma) => {
    return (
      <div key={gma.id} className="col-xs-6 col-sm-4 col-md-3" style={{minHeight: "575px"}}>
        <div className="thumbnail">
          <Link to={`/gma/${gma.id}`}>
            {gma.profile_image_url &&
              <img className="img-rounded img-responsive gma-orange-border"
                style={{objectFit: 'cover', maxWidth: '135px', maxHeight: '135px', minWidth: '135px', minHeight: '135px'}}
                src={gma.profile_image_url}
                alt={`Gma ${gma.first_name}`}/>
            }
            {!gma.profile_image_url &&
              <img className="img-rounded img-responsive gma-orange-border"
                style={{objectFit: 'cover', maxWidth: '135px', maxHeight: '135px', minWidth: '135px', minHeight: '135px'}}
                src={imgUrl(gma)}
                alt="gmas placeholder"/>
            }
          </Link>
          <div className="caption">
            <h3 className="gma-orange text-center gma-font">
              Gma {gma.first_name}
            </h3>
             {!gma.active &&
                <div className="tc mb3"><span className="f3 label label-warning">Inactive</span></div>
              }
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
                <li style={{listStyleType:"none"}}>{capitalizeWords(Neighborhood.parse(gma.neighborhood).text)}</li>
                {gma.available_outside_neighborhood &&
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
