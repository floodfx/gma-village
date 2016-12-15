import React from 'react';
import {Availability, CareAge, CareLocation, Neighborhood} from 'gma-village-data-model'
import {WILLING_TO_TRAVEL} from '../containers/GmasListContainer'

const customSortNeighborhoods = (n1, n2) => {
  if(n2 === Neighborhood.NORTH_OAKLAND) {
    return 1;
  } else {
    return n1.ordinal - n2.ordinal
  }
}


const filterBy = (header, enumValues, filters, onFilterClick, allOrNoneEnabled=false) => {
  return (
    <div>
      <h4><u>{header}</u>&nbsp;
        {allOrNoneEnabled &&
          <span style={{whiteSpace: 'nowrap'}}>
            (<a onClick={(event) => onFilterClick(enumValues.filter((enumValue) => !filters.includes(enumValue)))}>all</a>,&nbsp;
             <a onClick={(event) => onFilterClick(filters.filter((filter) => enumValues.includes(filter)))}>none</a>)
          </span>
        }
      </h4>
      {enumValues.map((val) => {
        return (
          <label key={val.name} style={{whiteSpace: 'nowrap'}}>
            <input checked={filters.includes(val)} onChange={(event) => onFilterClick([val], event)} type="checkbox" value={val.ordinal}/>&nbsp;
              {val.text}
              &nbsp;
              &nbsp;
          </label>
        )
      })}
    </div>
  )
}

const GmasFilter = ({filters, onFilterClick}) => (
  <div className="col-md-12 col-sm-8 gma-orange-border" style={{marginBottom: '10px'}}>
    <h3 className="gma-orange">Find Gmas that:</h3>
      <div className="col-md-2">
        {filterBy('Live in:', Neighborhood.enumValues.slice(0).sort(customSortNeighborhoods), filters, onFilterClick)}
        <label key={"willingToTravel"} style={{whiteSpace: 'nowrap'}}>
          <input checked={filters.includes(WILLING_TO_TRAVEL)} onChange={(event) => onFilterClick([WILLING_TO_TRAVEL], event)} type="checkbox" value={WILLING_TO_TRAVEL}/>
            &nbsp;Willing to Travel
        </label>
      </div>
      <div className="col-md-2 col-md-offset-1">
        {filterBy('Care for kids ages:', CareAge.enumValues, filters, onFilterClick)}
      </div>
      <div className="col-md-2 col-md-offset-1">
        {filterBy('Can provide care at:', CareLocation.enumValues, filters, onFilterClick)}
      </div>
      <div className="col-md-2 col-md-offset-1">
        {filterBy('Are generally available:', Availability.enumValues, filters, onFilterClick)}
      </div>
  </div>
)


export default GmasFilter
