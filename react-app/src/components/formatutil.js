import React from 'react';

export const capitalizeWords = (word) => {
  return <span style={{textTransform:'capitalize'}}>{word.toLowerCase().replace(/_/g, " ")}</span>
}

export const formatPhone = (phone) => {
  const ph = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
  return `(${ph[1]}) ${ph[2]}-${ph[3]}`
}
