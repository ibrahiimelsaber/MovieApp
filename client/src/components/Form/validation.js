const checkIfEmpty =(field => {
  if (isEmpty(field.value.trim())) {
    setInvalid(field, ` ${field.name} must not empty`);
    return true;
  } else {
    return 
  }
}
const isEmpty = (value) => {
  if(value === '') return true;
  return false
}
const setInvalid = ((field, message) => {
  return `${field.name} must not be empty`
})

export const validateForm = () => {
  return checkIfEmpty
}
