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

  renderEnumListString = (label, vals, other) => {
    const valueNames = vals.map((val) => (!!val && val.length > 0) ? val : null).filter(e => !!e);
    if(other) {
      valueNames.push(other)
    }
    var list = valueNames.map((val) => {
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

  renderEnumList = (label, enumClass, vals, other) => {
    const valueNames = vals.map((val) => (!!val && val.length > 0) ? enumClass.parse(val).text : null).filter(e => !!e);
    if(other) {
      valueNames.push(other)
    }
    var list = valueNames.map((val) => {
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
    const valueNames = vals.map((val) => {
      if(val.name === "Other") {
        return other;
      }
      else {
        if(enumClass === CareLocation && val === 'ELSEWHERE') {
          return "Elsewhere";
        } else {
          return (!!val && val.length > 0) ? enumClass.parse(val).text : null
        }
      }
    }).filter(e => !!e);
    return (
      <div>
        <h4>{label}
          <span className="ml2 normal">
            {valueNames.join(", ")}
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
              {gma.profile_image_url &&
                <img className="h-100-ns h-80 gma-orange-border"
                  style={{
                    objectFit: 'cover'
                  }}
                  src={gma.profile_image_url}
                  alt={`Gma ${gma.first_name}`}/>
              }
              {!gma.profile_image_url &&
                <img className="h-100-ns h-80 gma-orange-border"
                  style={{
                    objectFit: 'cover'
                  }}
                  src={imgUrl(gma)}
                  alt="gmas placeholder"/>
              }
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
                  {currentUser.user_type === "ADMIN" &&
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
                    {gma.neighborhood.label === Neighborhood.OTHER.name &&
                      <span>{gma.other_neighborhood}</span>
                    }
                    {gma.neighborhood !== Neighborhood.OTHER.name &&
                      <span>{gma.neighborhood.name}</span>
                    }
                  </span>
                </h4>
                {gma.available_outside_neighborhood &&
                  <h4 className="normal">I'm willing to travel to provide care</h4>
                }
                {this.renderEnumCSV("Care for kids ages:", CareAge, gma.care_ages)}
                {this.renderEnumCSV("Provide care at:", CareLocation, gma.care_locations)}
                {this.renderEnumCSV("General Availability:", Availability, gma.availabilities, gma.other_availability)}
              </div>
            </div>
          </div>
        </div>
        <div className="mw-100 center">
          <div className="cf">
            <div className="fl w-100 pa2-ns pb3">
              <div className="media-body gma-orange-border ph4">
                {this.renderEnumCSV("I would describe myself as:", Demeanor, gma.demeanors, gma.other_demeanor)}
                <h4>
                  I enjoy caring for kids because:
                  <span className="ml2 normal">
                    {gma.why_care_for_kids}
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
                {this.renderEnumList("Experience:", CareExperience, gma.care_experiences, gma.other_care_experience)}
              </div>
            </div>
          </div>
        </div>
        <div className="mw-100 center">
          <div className="cf">
            <div className="fl w-100 pa2-ns pb3">
              <div className="media-body gma-orange-border ph4">
                {this.renderEnumListString("Training:", gma.care_trainings, gma.other_care_training)}
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
                    {gma.additional_info}
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
