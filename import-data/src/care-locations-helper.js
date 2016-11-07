var {CareLocation} = require('gma-village-data-model')

const CareLocationsHelper = {
  VALID_VALUES_MAP: {
    'The child\'s home': CareLocation.CHILDS_HOME,
    'The provider\'s home': CareLocation.PROVIDERS_HOME,
    'I\'m flexible': [CareLocation.CHILDS_HOME, CareLocation.PROVIDERS_HOME]
  }
}

module.exports = CareLocationsHelper
