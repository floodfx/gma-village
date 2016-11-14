import React from 'react'

const capitalizeWords = (word) => {
  return <span style={{textTransform:'capitalize'}}>{word.toLowerCase().replace(/_/g, " ")}</span>
}

export default capitalizeWords
