var { Neighborhood } = require('gma-village-data-model');
var moment = require('moment');

const formatNeighborhood = (neighborhood, otherNeighborhood) => {
  if(neighborhood === Neighborhood.OTHER.name)
    return otherNeighborhood;
  else {
    return Neighborhood.parse(neighborhood).text
  }
}

const ageFromBirthday = (birthday) => {
  var now = moment();
  var bday = moment.unix(birthday);
  var monthsDiff = now.diff(bday, 'months');
  var years = Math.abs(Math.floor(monthsDiff/12));
  var months = Math.abs(monthsDiff % 12);
  var formattedComponents = [];
  if(years === 1) {
    formattedComponents.push("1 yr")
  } else if(years > 1) {
    formattedComponents.push(`${years} yrs`)
  }
  if(months === 1) {
    formattedComponents.push("1 mo")
  } else if(months > 1) {
    formattedComponents.push(`${months} mos`)
  }
  
  var text = formattedComponents.join(" & ")+" old";
  return {
    years,
    months,
    text
  }
}

const kidsCount = (kids) => {
  if(kids.length === 1) {
    return "1 kid"
  } else {
    return `${kids.length} kids`
  }
}

const buildMessage = (
  parent, 
  kids, 
  neighborhood, 
  otherNeighborhood, 
  startDateTimeOfNeed,
  endDateTimeOfNeed) => {
  var kidsAges = kids.map((kid) => {
    var age = ageFromBirthday(kid.birthday);
    return age.text;
  }).join(", ")
  var msg = 
    `[GmaVillage] Parent ${parent.first_name} `+
    `needs child care for ${kidsCount(kids)} (${kidsAges}) in `+
    `${formatNeighborhood(neighborhood, otherNeighborhood)} `+
    `on ${moment.unix(startDateTimeOfNeed).format("MMM Do, h:mma")}` +
    `-${moment.unix(endDateTimeOfNeed).format("h:mma")}. `+
    `Text [${parent.phone}] to setup interview.`
  return msg;
}

module.exports = {
  buildMessage,
  ageFromBirthday
}