var {CareExperience} = require('gma-village-data-model')

const CareExperiencesHelper = {
  VALID_VALUES_MAP: {
    'Raised my kids': CareExperience.RAISED_KIDS,
    'Cared for my grankids': CareExperience.CARED_FOR_GRANDKIDS
  }
}

module.exports = CareExperiencesHelper
