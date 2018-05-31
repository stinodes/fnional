// @flow
/*
Objects
 */
type $GetInObject = <O: {[mixed]: mixed}, K>(obj: O, key: K) => $ElementType<O, K>
type $GetInArray = <A: Array<mixed>, K: number>(arr: A, key: K) => $ElementType<A, K>
type $GetIn = $GetInArray&$GetInObject
const getInObject: $GetInObject = (obj, key) => obj[key]
const getInArray: $GetInArray = (arr, key) => arr[key]
export const getIn: $GetIn = (obj, key) => {
  if (Array.isArray(obj)) {
    if (typeof key !== 'number')
      throw TypeError('Can only get from Array by number')
    return getInArray(obj, key)
  }
  return getInObject(obj, key)
}
// export const setIn = (obj, key, value) => ({...obj, [key]: value})
//
// /*
// Functions
//  */
// export const composeReturn = (returnVal, fn) =>
//   (...args) => {
//     fn(...args)
//     return returnVal
//   }
//
// /*
// Errors
//  */
// export const onCatch = (fn, callback) => {
//   return (...args) => {
//     try {
//       return fn(...args)
//     }
//     catch (e) {
//       callback(e, ...args)
//     }
//   }
// }
// export const throwIf = (condition, exception) => {
//   if (condition) {
//     throw typeof exception === 'function' ? exception() : exception
//   }
//   return false
// }