/*
Objects
 */
export const getIn = (obj, key) => obj[key]
export const setIn = (obj, key, value) => ({...obj, [key]: value})

/*
Functions
 */
export const composeReturn = (returnVal, fn) =>
  (...args) => {
    fn(...args)
    return returnVal
  }
  
/*
Errors
 */
const onCatch = (fn, callback) => {
  return (...args) => {
    try {
      return fn(...args)
    }
    catch (e) {
      callback(e, ...args)
    }
  }
}
const throwIf = (condition, exception) => {
  if (condition) {
    throw typeof exception === 'function' ? exception() : exception
  }
  return false
}