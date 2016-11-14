import React, { Component } from 'react';
import capitalizeWords from './formatutil'
import imgUrl from './ImageUrl'

class GmaProfile extends Component {

  joinAndCapitalize = (items) => {
    return capitalizeWords(items.join(","))
  }

  render() {
    const { gma } = this.props;
    if(this.props.loading) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="thumbnail">
                <img src={imgUrl(gma)} alt={"Gma " + gma.first_name} width="240" height="320"/>
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <h1 className="gma-orange">Gma {gma.first_name}</h1>
              <p><strong>Neighborhood:</strong> {capitalizeWords(gma.neighborhood)}</p>
              <p><strong>Care for kids ages:</strong> {this.joinAndCapitalize(gma.careAges)}</p>
              <p><strong>Provide care at:</strong> {this.joinAndCapitalize(gma.careLocations)}</p>
              <p><strong>General Availability:</strong> {this.joinAndCapitalize(gma.availabilities)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <p><strong>I would describe myself as:</strong> {this.joinAndCapitalize(gma.demeanors)}</p>
              <p><strong>I enjoy caring for kids because:</strong> {gma.whyCareForKidsText}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <h3>Experience:</h3>
              <ul>
                {gma.careExperiences.map((exp) => {
                  return <li key={exp}>{capitalizeWords(exp)}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <h3>Training:</h3>
              <ul>
                {gma.careTrainings.map((tra) => {
                  return <li key={tra}>{capitalizeWords(tra)}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <p><strong>Something else I'd like to share:</strong> {gma.additionalInformationText}</p>
            </div>
          </div>
        </div>
      )
    }
  }

}

export default GmaProfile
