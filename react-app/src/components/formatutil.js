import React from 'react';
import moment from 'moment';

export const capitalizeWords = (word) => {
  return <span style={{textTransform:'capitalize'}}>{word.toLowerCase().replace(/_/g, " ")}</span>
}

export const formatPhone = (phone) => {
  const ph = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
  return `(${ph[1]}) ${ph[2]}-${ph[3]}`
}

export const ageFromBirthday = (birthday) => {
  var now = moment();
  var bday = moment.unix(birthday);
  var monthsDiff = now.diff(bday, 'months');
  var years = Math.abs(Math.floor(monthsDiff/12));
  var months = Math.abs(monthsDiff % 12);
  var formattedComponents = [];
  if(years === 1) {
    formattedComponents.push("1 year")
  } else if(years > 1) {
    formattedComponents.push(`${years} years`)
  }
  if(months === 1) {
    formattedComponents.push("1 month")
  } else if(months > 1) {
    formattedComponents.push(`${months} months`)
  }
  var text = formattedComponents.join(", ")+" old";
  return {
    years,
    months,
    text
  }
}
