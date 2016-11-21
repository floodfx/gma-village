import React, { Component } from 'react';
import { Link } from 'react-router';
import { capitalizeWords, careAgeTextToNumber, formatPhone }  from './formatutil'
import imgUrl from './ImageUrl'

class GmaProfile extends Component {

  joinAndCapitalize = (items) => {
    return capitalizeWords(items.join(", "))
  }

  render() {
    const { gma } = this.props;
    if(this.props.loading) {
      return <div>Loading...</div>
    } if(this.props.error) {
      return <div>Error loading page: {this.props.error}</div>
    } else {
      return (
        <div>
          <div>
            <ol className="breadcrumb">
              <li><Link to={'/gmas'}>&larr; Back</Link></li>
            </ol>
          </div>
          <div className="row">
            <div className="gma-flags-bg" style={{marginBottom: '30px'}}>&nbsp;</div>
          </div>
          <div className="row">
            <div className="media col-md-12 col-sm-6">
              <div className="media-left">
                <img className="media-object img-rounded gma-orange-border" src={imgUrl(gma)} alt={"Gma " + gma.first_name} style={{objectFit: 'cover', maxWidth: '235px', maxHeight: '235px', minWidth: '235px', minHeight: '235px'}}/>
              </div>

              <div className="media-body gma-orange-border" style={{padding: '20px'}}>
                <div className="pull-right">
                  <a className="btn gma-orange-bg" href={"tel:"+gma.phone}>{formatPhone(gma.phone)}</a>
                </div>
                <h1 className="media-heading gma-orange">Gma {gma.first_name}</h1>

                <h4>I live in: <span style={{fontWeight: 'normal'}}>{capitalizeWords(gma.neighborhood)}</span></h4>
                {gma.isAvailableOutsideNeighborhood &&
                <h4 style={{fontWeight: 'normal'}}>I'm willing to travel to provide care</h4>
                }
                <h4>Care for kids ages: <span style={{fontWeight: 'normal'}}>{gma.careAges.map((age) => careAgeTextToNumber(age)).join(", ")}</span></h4>
                <h4>Provide care at: <span style={{fontWeight: 'normal'}}>{this.joinAndCapitalize(gma.careLocations)}</span></h4>
                <h4>General Availability: <span style={{fontWeight: 'normal'}}>{this.joinAndCapitalize(gma.availabilities)}</span></h4>
              </div>
            </div>
          </div>
          <div className="row" style={{marginTop: '10px'}}>
            <div className="media col-md-12 col-sm-6">
              <div className="media-body gma-orange-border" style={{padding: '0px 20px'}}>
                <h4>I would describe myself as: <span style={{fontWeight: 'normal'}}>{this.joinAndCapitalize(gma.demeanors)}</span></h4>
                <h4>I enjoy caring for kids because: <span style={{fontWeight: 'normal'}}>{gma.whyCareForKidsText}</span></h4>
              </div>
            </div>
          </div>
          <div className="row" style={{marginTop: '10px'}}>
            <div className="media col-md-12 col-sm-6">
              <div className="media-body gma-orange-border" style={{padding: '0px 20px'}}>
                <h4>Experience</h4>
                <ul>
                  {gma.careExperiences.map((exp) => {
                    return <li key={exp}><h4 style={{fontWeight: 'normal'}}>{capitalizeWords(exp)}</h4></li>
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="row" style={{marginTop: '10px'}}>
            <div className="media col-md-12 col-sm-6">
              <div className="media-body gma-orange-border" style={{padding: '0px 20px'}}>
                <h4>Training</h4>
                <ul>
                  {gma.careTrainings.map((tra) => {
                    return <li key={tra}><h4 style={{fontWeight: 'normal'}}>{capitalizeWords(tra)}</h4></li>
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="row" style={{marginTop: '10px'}}>
            <div className="media col-md-12 col-sm-6">
              <div className="media-body gma-orange-border" style={{padding: '0px 20px'}}>
                <h4>Something else I'd like to share: <span style={{fontWeight: 'normal'}}>{gma.additionalInformationText}</span></h4>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

}

export default GmaProfile
