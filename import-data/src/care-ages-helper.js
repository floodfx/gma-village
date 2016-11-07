var {CareAge} = require('gma-village-data-model')

const CareAgesHelper = {
  VALID_VALUES_MAP: {
    '0-6 months': CareAge.ZERO_TO_SIX_MONTHS,
    '6 months - 2 years': CareAge.SIX_MONTHS_TO_TWO_YEARS,
    '3 years - 5 years': CareAge.TWO_YEARS_TO_FIVE_YEARS,
    '6+ years': CareAge.FIVE_YEARS_PLUS
  }
}

module.exports = CareAgesHelper
