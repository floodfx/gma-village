import React from 'react';
import {Availability, CareAge, CareLocation, Neighborhood} from 'gma-village-data-model'
import {WILLING_TO_TRAVEL} from '../containers/GmasListContainer'
import { customSortNeighborhoods } from './SortHelp';
import ActiveStatus from './ActiveStatus';
import ElsewhereLearnMore from './ElsewhereLearnMore';


const filterBy = (header, enumValues, filters, onFilterClick, allOrNoneEnabled=false) => {
  var checkboxes = enumValues.map((val) => {
        var text = val.text;
        if(val === CareLocation.CHILDS_HOME) {
          text = "Elsewhere"
        }
        return (
          <label key={val.name} style={{whiteSpace: 'nowrap'}}>
            <input checked={filters.includes(val)} onChange={(event) => onFilterClick([val], event)} type="checkbox" value={val.ordinal}/>&nbsp;
              {text}
              &nbsp;
              &nbsp;
          </label>
        )
      });
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
      {checkboxes}
    </div>
  )
}

const GmasFilter = ({filters, onFilterClick, user}) => (
  <div>
    <h3 className="gma-orange">Find Gmas that:</h3>
      <div className="col-md-2">
        {filterBy('Live in:', Neighborhood.enumValues.slice(0).sort(customSortNeighborhoods).filter((val) => val !== Neighborhood.OTHER), filters, onFilterClick)}
        <label key={"willingToTravel"} style={{whiteSpace: 'nowrap'}}>
          <input checked={filters.includes(WILLING_TO_TRAVEL)} onChange={(event) => onFilterClick([WILLING_TO_TRAVEL], event)} type="checkbox" value={WILLING_TO_TRAVEL}/>
            &nbsp;Willing to Travel
        </label>
      </div>
      <div className="col-md-2 col-md-offset-1">
        {filterBy('Care for kids ages:', CareAge.enumValues, filters, onFilterClick)}
      </div>
      <div className="col-md-2 col-md-offset-1">
        {filterBy('Can provide care at:', CareLocation.enumValues.slice(0).reverse(), filters, onFilterClick)}
        <ElsewhereLearnMore />
      </div>
      <div className="col-md-2 col-md-offset-1">
        {filterBy('Are generally available:', Availability.enumValues.filter((val) => val !== Availability.OTHER), filters, onFilterClick)}
      </div>
      {user.user_type === 'ADMIN' &&
        <div className="col-md-2 col-md-offset-1">
          {filterBy('Active', ActiveStatus.enumValues, filters, onFilterClick)}
        </div>
      }
  </div>
)


export default GmasFilter
