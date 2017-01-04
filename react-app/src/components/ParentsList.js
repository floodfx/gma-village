import React, { Component } from 'react';
import { Link } from 'react-router';
import { capitalizeWords, formatPhone } from './formatutil'
import imgUrl from './ImageUrl'

class ParentsList extends Component {

  render() {
    if (this.props.loading) {
      return (
        <div>
          <FontAwesome name='spinner' spin={true} className="mr1" />
          Loading...
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="col-md-12 col-sm-8 gma-orange-border">
            <h1 className="gma-orange">Parents <span className="badge">{this.props.parents.length}</span></h1>
            }
            <div className="dt">
            {this.props.parents.map((parent) => {
              <div>
                <div className="dtc">{parent.first_name}</div>
                <div className="dtc">{parent.last_name}</div>
                <div className="dtc">{parent.active}</div>
                <div className="dtc">
                  <button type="button" onClick={() => toggleParentActivation(parent.id)}>
                    {parent.active &&
                      Deactivate
                    }
                    {!parent.active &&
                      Activate
                    }
                  </button>
                </div> 
              </div>           
            })}
            </div>
          </div>
        </div>
        
      );
    }
  }

  renderProfileThumbnail = (gma) => {
    return (
      <div key={gma.id} className="col-sm-6 col-md-3" style={{ minHeight: "575px" }}>
        <div className="thumbnail">
          <Link to={`/gma/${gma.id}`}>
            <img className="img-rounded img-responsive gma-orange-border" style={{ objectFit: 'cover', maxWidth: '135px', maxHeight: '135px', minWidth: '135px', minHeight: '135px' }} src={imgUrl(gma)} alt="gmas placeholder" />
          </Link>
          <div className="caption">
            <h3 className="gma-orange text-center gma-font">Gma {gma.first_name}</h3>
            <div className="text-center">
              <a className="btn gma-orange-bg" href={"tel:" + gma.phone}>{formatPhone(gma.phone)}</a>
            </div>
            <div className="text-center" style={{ marginTop: '30px' }}>
              <p style={{ fontWeight: "bold" }}>Availability</p>
              <ul style={{ display: "inline", padding: 0 }}>
                {gma.availabilities.map((avail) => {
                  return <li style={{ listStyleType: "none" }} key={avail}>{capitalizeWords(avail)}</li>
                })}
              </ul>
            </div>
            <div className="text-center" style={{ marginTop: '20px' }}>
              <p style={{ fontWeight: "bold" }}>Neighborhood</p>
              <ul style={{ display: "inline", padding: 0 }}>
                <li style={{ listStyleType: "none" }}>{capitalizeWords(gma.neighborhood)}</li>
                {gma.isAvailableOutsideNeighborhood &&
                  <li style={{ listStyleType: "none" }}>Willing to travel</li>
                }
              </ul>
            </div>
            <div style={{ marginTop: '30px' }} className="text-center">
              <Link to={`/gma/${gma.id}`}>Read More &rarr;</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default GmasList
