import React, { Component } from 'react';

const CheckboxItem = ({label, value, checked}) => {
  return (
    <div className="flex items-center mb2">
      <input className="mr2" type="checkbox" checked={checked} value={value}>
      <label className="lh-copy">{label}</label>
    </div>
  )
}

const CheckboxWithOther = ({id, name, allValues, otherValue, selectedValues}) => {
  var labeledAndSelectedValues = allValues.map((val) => {
    var entry = {};
    entry.label = val.name;
    entry.value = val.name;
    entry.selected = selectedValues.includes(val.name);
    return entry;
  })
  return (
    <fieldset id={id} className="bn">
      <legend className="fw7 mb2">{name}</legend>
      {labeledAndSelectedValues.map((triple) => {
        return <CheckboxItem label={triple.label} value={triple.value} selected={triple.selected} />
      })}
    </fieldset>
  )

}

export default CheckboxWithOther
