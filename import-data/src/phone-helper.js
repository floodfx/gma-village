
const PhoneHelper = {

  parse: (phone) => {
    return phone.replace(/\D|\s/g, '');
  }

}

module.exports = PhoneHelper
