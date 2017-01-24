import React, { Component } from 'react';
import { Link } from 'react-router';
import { formatPhone }  from './formatutil';
import imgUrl from './ImageUrl';
import {
  Availability,
  CareAge,
  CareExperience,
  CareLocation,
  CareTraining,
  Demeanor,
  Neighborhood
} from 'gma-village-data-model';

class GmaProfile extends Component {

  renderEnumList = (label, enumClass, vals, other) => {
    const parsedVals = vals.map((val) => enumClass.parse(val).text);
    if(other) {
      parsedVals.push(other)
    }
    var list = parsedVals.map((val) => {
                if(val !== "Other") {
                  return ( 
                    <li key={val}>
                      <h4>
                        <span className="normal">
                          {val}
                        </span>
                      </h4>
                    </li>
                  )
                }
              }) 
    return (
      <div>
        <h4>{label}</h4>
          <ul>
            {list} 
          </ul>         
      </div>
    )
  }

  renderEnumCSV = (label, enumClass, vals, other) => {
    const parsedVals = vals.map((val) => {
      if(val !== "OTHER") {
        var parsedVal = enumClass.parse(val);
        if(enumClass === CareLocation && parsedVal === CareLocation.CHILDS_HOME) {
          return "Elsewhere";
        } else {
          return parsedVal.text
        }
      }
    });
    if(other) {
      parsedVals.push(other)
    }
    return (
      <div>
        <h4>{label}           
          <span className="ml2 normal">
            {parsedVals.join(", ")}
          </span>
        </h4>
      </div>
    )
  }

  render() {
    const { currentUser, gma } = this.props;
    return (
      <div>
        <div>
          <ol className="breadcrumb">
            <li><Link to={'/gma/list'}>&larr; Back</Link></li>
          </ol>
        </div>
        <div className="mw-100 center">
          <div className="cf" style={{height: 400}}>
            <div className="fl w-100 w-30-ns h-100-ns h-80 pa2-ns pb3 tc">
              <img 
                className="h-100-ns h-80 gma-orange-border" 
                src={imgUrl(gma)} 
                alt={"Gma " + gma.first_name} 
                style={{
                  objectFit: 'cover'
                }}/>
            </div>
            <div className="fl w-100 w-70-ns h-100-ns h-80 pa2-ns pb3">
              <div className="h-100-ns h-80 gma-orange-border pa4-ns pa4">
                <div className="pull-right">                  
                  <a 
                    className="btn gma-orange-bg" 
                    href={"tel:"+gma.phone}>
                    {formatPhone(gma.phone)}
                  </a>                  
                </div>                
                  {!gma.active &&
                    <div className="fl pt2-ns pt2"><span className="f3 label label-warning mr3">Inactive</span></div>
                  }                
                <h1 className="media-heading gma-orange">
                  
                  <span>Gma {gma.first_name}</span>
                  {currentUser.kind === "Admin" &&
                    <Link 
                      className="btn gma-orange-bg ml2" 
                      to={`/gma/edit/${gma.id}`}>
                      Edit
                    </Link>
                  }
                </h1>

                <h4>
                  I live in:
                  <span className="ml2 normal">
                    {gma.neighborhood === Neighborhood.OTHER.name &&
                      <span>{gma.otherNeighborhood}</span>
                    }
                    {gma.neighborhood !== Neighborhood.OTHER.name &&
                      <span>{Neighborhood.parse(gma.neighborhood).text}</span>
                    }
                  </span>
                </h4>
                {gma.isAvailableOutsideNeighborhood &&
                  <h4 className="normal">I'm willing to travel to provide care</h4>
                }
                {this.renderEnumCSV("Care for kids ages:", CareAge, gma.careAges)}
                {this.renderEnumCSV("Provide care at:", CareLocation, gma.careLocations)}
                {this.renderEnumCSV("General Availability:", Availability, gma.availabilities, gma.otherAvailability)}
              </div>
            </div>
          </div>
        </div>
        <div className="mw-100 center">
          <div className="cf">
            <div className="fl w-100 pa2-ns pb3">
              <div className="media-body gma-orange-border ph4">
                {this.renderEnumCSV("I would describe myself as:", Demeanor, gma.demeanors, gma.otherDemeanor)}
                <h4>
                  I enjoy caring for kids because: 
                  <span className="ml2 normal">
                    {gma.whyCareForKidsText}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="mw-100 center">
          <div className="cf">
            <div className="fl w-100 pa2-ns pb3">
              <div className="media-body gma-orange-border ph4">
                {this.renderEnumList("Experience:", CareExperience, gma.careExperiences, gma.otherCareExperience)}
              </div>
            </div>
          </div>
        </div>
        <div className="mw-100 center">
          <div className="cf">
            <div className="fl w-100 pa2-ns pb3">
              <div className="media-body gma-orange-border ph4">
                {this.renderEnumList("Training:", CareTraining, gma.careTrainings, gma.otherCareTraining)}
              </div>
            </div>
          </div>
        </div>
        <div className="mw-100 center">
          <div className="cf">
            <div className="fl w-100 pa2-ns pb3">
              <div className="media-body gma-orange-border ph4">
                <h4>
                  Something else I'd like to share: 
                  <span className="ml2 normal">
                    {gma.additionalInformationText}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default GmaProfile;
