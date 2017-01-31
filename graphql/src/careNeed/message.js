var { Neighborhood } = require('gma-village-data-model');
var moment = require('moment');


const DATE_FORMAT_RFC3339 = 'YYYY-MM-DDTHH:mm:ssZ'

const formatNeighborhood = (neighborhood, otherNeighborhood) => {
  if(neighborhood === Neighborhood.OTHER.name)
    return otherNeighborhood;
  else {
    return Neighborhood.parse(neighborhood).text
  }
}

const formatPhone = (phone) => {
  if(phone.length === 10) {
    return `${phone.slice(0,3)}-${phone.slice(3,6)}-${phone.slice(6)}`
  }
  else {
    return phone;
  }
}

const ageFromBirthday = (birthday) => {
  var now = moment();
  var bday = moment.unix(birthday);
  var monthsDiff = now.diff(bday, 'months');
  var years = Math.abs(Math.floor(monthsDiff/12));
  var months = Math.abs(monthsDiff % 12);
  var formattedComponents = [];
  roundAgeFormat = (years, months) => {
    if(years >= 4) {
      return `${years} yrs old`
    }
    var mos = Math.max(months, 1);
    var moOrMos = months > 1 ? "mos" : "mo";
    if(years === 0) {
      return `${mos} ${moOrMos} old`
    }
    var yrOrYrs = years > 1 ? 'yrs' : 'yr'
    if(months >= 0 && months < 4) {
      return `${years} ${yrOrYrs} old`
    }
    else if(months >= 4 && months < 9) {
      return `${years} 1/2 ${yrOrYrs} old`
    }
    else if(months >=9) {
      return `${years+1} ${(yrOrYrs === 'yr') ? 'yrs' : 'yrs'} old`
    }
  }
   
  var text = roundAgeFormat(years, months)
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

const kidsAges = (kids) => {
  return kids.map((kid) => {
    var age = ageFromBirthday(kid.birthday);
    return age.text;
  }).join(", ")
}

const formatDate = (dateString, format, incomingFormat=DATE_FORMAT_RFC3339) => {
  return moment(dateString, incomingFormat).format(format)
}

const buildMessage = (
  parent, 
  kids, 
  neighborhood, 
  otherNeighborhood, 
  startDateTimeOfNeed,
  endDateTimeOfNeed) => {  
  var msg = 
    `Gma Village Parent ${parent.first_name} `+
    `needs care for ${kidsCount(kids)} (${kidsAges(kids)}) in `+
    `${formatNeighborhood(neighborhood, otherNeighborhood)} `+
    `on ${formatDate(startDateTimeOfNeed, "MMM Do, h:mma")}` +
    `-${formatDate(endDateTimeOfNeed,"h:mma")}. `+
    `Text ${formatPhone(parent.phone)} to setup interview.`
  return msg;
}

module.exports = {
  buildMessage,
  ageFromBirthday,
  formatDate,
  formatPhone,
  formatNeighborhood,
  kidsCount,
  kidsAges
}