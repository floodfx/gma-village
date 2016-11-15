import React from 'react'
import { CareAge } from 'gma-village-data-model'

export const capitalizeWords = (word) => {
  return <span style={{textTransform:'capitalize'}}>{word.toLowerCase().replace(/_/g, " ")}</span>
}

export const formatPhone = (phone) => {
  const ph = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
  return `(${ph[1]}) ${ph[2]}-${ph[3]}`
}

export const careAgeTextToNumber = (careAge) => {
  switch(careAge) {
    case CareAge.ZERO_TO_SIX_MONTHS.name:
      return "0-6 months"
    case CareAge.SIX_MONTHS_TO_TWO_YEARS.name:
      return "6 months-2 years"
    case CareAge.TWO_YEARS_TO_FIVE_YEARS.name:
      return "2-5 years"
    case CareAge.FIVE_YEARS_PLUS.name:
      return "5+ years"
    default:
      return ''
  }
}
