var moment = require('moment');
TIMEPERIOD_REGEX=/([1-9]{1}|0[1-9]{1}|1[0-2]{1}):?([0-5][0-9])?([ap]m)-([1-9]{1}|0[1-9]{1}|1[0-2]{1}):?([0-5][0-9])?([ap]m)/

const correctUtcOffset = (message) => {
  const match = TIMEPERIOD_REGEX.exec(message);
  if(match) {
    const times = match[0].split('-');
    var startMoment = moment(times[0], 'h:mma');
    var endMoment = moment(times[1], 'h:mma');
    startMoment.subtract(8, 'hours');
    endMoment.subtract(8, 'hours');
    const newTimes = `${startMoment.format('h:mma')}-${endMoment.format('h:mma')}`
    const newMessage = message.replace(match[0], newTimes);
    return newMessage;
  }  
  return message
}

module.exports = {
  correctUtcOffset
}