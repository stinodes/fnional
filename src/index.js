/*
Objects
 */
const throwIfNotNumber = (key) => throwIf(typeof key !== 'number', new TypeError('Can only set in Array by number'))

const getInObject = (obj, key) => obj[key]
const getInArray = (arr, key) => arr[key]
export const getIn = (obj, key) => {
  if (Array.isArray(obj)) {
    throwIfNotNumber(key)
    return getInArray(obj, key)
  }
  return getInObject(obj, key)
}

export const setIn = (obj, key, value) => {
  if (Array.isArray(obj)) {
    throwIfNotNumber(key)
    return obj.map((v, k) => k === key ? value : v)
  }
  return ({...obj, [key]: value})
}

export const deleteIn = (obj, key) => {
  if (Array.isArray(obj)) {
    throwIfNotNumber(key)
    return obj.filter((v, i) => i !== key)
  }
  const newObj = {...obj}
  delete obj[key]
  return obj
}

export const shallowMerge = (obj1, obj2) => {
  if (Array.isArray(obj1)) {
    throwIf(!Array.isArray(obj2), new TypeError('Both parameters should be either an Array or Object.'))
    return [...obj1, ...obj2]
  }
  throwIf(Array.isArray(obj2), new TypeError('Both parameters should be either an Array or Object.'))
  return {...obj1, ...obj2}
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