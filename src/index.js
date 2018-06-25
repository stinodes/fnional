/*
Objects
 */
const getInObject = (obj, key) => obj[key]
const getInArray = (arr, key) => arr[key]
export const getIn = (obj, key) => {
  if (Array.isArray(obj)) {
    if (typeof key !== 'number')
      throw TypeError('Can only get from Array by number')
    return getInArray(obj, key)
  }
  return getInObject(obj, key)
}

export const setIn = (obj, key, value) => {
  if (Array.isArray(obj)) {
    if (typeof key !== 'number')
      throw TypeError('Can only set in Array by number')
    return obj.map((v, k) => k === key ? value : v)
  }
  return ({...obj, [key]: value})
}


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
export const onCatch = (fn, callback) => {
  return (...args) => {
    try {
      return fn(...args)
    }
    catch (e) {
      callback(e, ...args)
    }
  }
}
export const throwIf = (condition, exception) => {
  if (condition) {
    throw typeof exception === 'function' ? exception() : exception
  }
}