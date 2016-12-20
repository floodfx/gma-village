import { normalizePhone } from './Normalize';

export const required = (value) => {
  console.log("required validate", value) 
  return value ? undefined : 'Required'
} 

export const requiredArray = (value) => {
  console.log("requiredArray validate", value) 
  return (value === undefined || value === null || (value instanceof Array && value.length !== 0)) ? undefined : 'Required'
} 

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

export const phone = value =>
  value && normalizePhone(value).length !== 10 ?
  'Must be 10 digits' : undefined