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
        if(enumClass === CareLocation && parsedVal === CareLocation.PROVIDERS_HOME) {
          return "My Home";
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
          <span className="normal">
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
        <div className="row">
          <div className="media col-md-12 col-sm-6">
            <div className="media-left">
              <img 
                className="media-object img-rounded gma-orange-border" 
                src={imgUrl(gma)} 
                alt={"Gma " + gma.first_name} 
                style={{
                  objectFit: 'cover', 
                  maxWidth: '235px', 
                  maxHeight: '235px', 
                  minWidth: '235px', 
                  minHeight: '235px'
                }}/>
            </div>

            <div className="media-body gma-orange-border" style={{padding: '20px'}}>
              <div className="pull-right">                  
                <a 
                  className="btn gma-orange-bg" 
                  href={"tel:"+gma.phone}>
                  {formatPhone(gma.phone)}
                </a>                  
              </div>
              <h1 className="media-heading gma-orange">
                Gma {gma.first_name}
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
                    <span>{gma.neighborhood.text}</span>
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
        <div className="row" style={{marginTop: '10px'}}>
          <div className="media col-md-12 col-sm-6">
            <div className="media-body gma-orange-border" style={{padding: '0px 20px'}}>
              {this.renderEnumCSV("I would describe myself as:", Demeanor, gma.demeanors, gma.otherDemeanor)}
              <h4>
                I enjoy caring for kids because: 
                <span className="normal">
                  {gma.whyCareForKidsText}
                </span>
              </h4>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '10px'}}>
          <div className="media col-md-12 col-sm-6">
            <div className="media-body gma-orange-border" style={{padding: '0px 20px'}}>
              {this.renderEnumList("Experience:", CareExperience, gma.careExperiences, gma.otherCareExperience)}
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '10px'}}>
          <div className="media col-md-12 col-sm-6">
            <div className="media-body gma-orange-border" style={{padding: '0px 20px'}}>
              {this.renderEnumList("Training:", CareTraining, gma.careTrainings, gma.otherCareTraining)}
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '10px'}}>
          <div className="media col-md-12 col-sm-6">
            <div className="media-body gma-orange-border" style={{padding: '0px 20px'}}>
              <h4>
                Something else I'd like to share: 
                <span className="normal">
                  {gma.additionalInformationText}
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default GmaProfile;
