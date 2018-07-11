// @flow
import {composeReturn, deleteIn, getIn, onCatch, setIn, shallowMerge, throwIf} from './index'

type Person = {
  name: string,
  nickname: string,
  age: number,
}
type Car = {
  wheels: number,
  brand: 'ford'|'volvo'|'porsche',
  year?: number,
}
type CarPerson = {...Car, ...Person}

describe('getIn', () => {
  test('returns value by string key from object literal', () => {
    const object = {
      name: 'Stijn Tytgat',
      nickname: 'stinodes',
      age: 23,
    }
    const result = getIn(object, 'name')
    expect(
      result
    ).toEqual('Stijn Tytgat')
  })
  test('returns value by number key from array', () => {
    const arr = ['potato', 'tomato', 'sprout', 'banana', 'apple']
    const result = getIn(arr, 3)
    expect(
      result
    ).toEqual('banana')
  })
  test('works when nested', () => {
    const nestedObject = {
      cart: [
        {
          name: 'Mad Skills',
          price: 55,
        },
      ],
    }
    const result: number = getIn(
      getIn(
        getIn(nestedObject, 'cart'),
        0,
      ),
      'price'
    )
    expect(
      result
    ).toEqual(55)
  })
})
describe('setIn', () => {
  test('returns a new object of the same type with the updated value.', () => {
    const object = {
      name: 'Stijn Tytgat',
      nickname: 'stinodes',
      age: 23,
    }
    const result = setIn(object, 'name', 'Stino Tytgat')
    expect(
      result.name
    ).toEqual('Stino Tytgat')
    expect(
      object.name
    ).toEqual('Stijn Tytgat')
  })
  test('returns a new array of the same type with the updated value', () => {
    const arr = ['potato', 'tomato', 'sprout', 'banana', 'apple']
    const result = setIn(arr, 3, 'MORE BANANA')
    expect(
      result[3]
    ).toEqual('MORE BANANA')
    expect(
      arr[3]
    ).toEqual('banana')
  })
})
describe('deleteIn', () => {
  test('returns a new object of which the given key is deleted', () => {
    const object: Car = {
      wheels: 4,
      brand: 'ford',
      year: 2005,
    }
    const result: Car = deleteIn(object, 'year')
    expect(
      result.year
    ).toEqual(undefined)
  })
  test('returns a new array of which the given key is deleted', () => {
    const arr = ['potato', 'tomato', 'sprout', 'banana', 'apple']
    const result = deleteIn(arr, 2)
    expect(
      result.length
    ).toEqual(arr.length - 1)
    expect(
      result[2]
    ).toEqual(arr[3])
  })
})
describe('shallowMerge', () => {
  test('shallowly merges 2 objects', () => {
    const object1: Car = {
      wheels: 4,
      brand: 'ford',
      year: 2016,
    }
    const object2: Car = {
      wheels: 6,
      brand: 'volvo',
    }
    const result: Car = shallowMerge(object1, object2)
    expect(
      result
    ).toEqual({wheels: 6, brand: 'volvo', year: 2016})
  })
  test('shallowly merges 2 arrays', () => {
    const arr1 = ['potato', 'tomato']
    const arr2 = ['sprout', 'banana', 'apple']
    const result = shallowMerge(arr1, arr2)
    expect(
      result
    ).toEqual(['potato', 'tomato', 'sprout', 'banana', 'apple'])
  })
  test('throws an error when trying to merge arrays with objects', () => {
    //$FlowFixMe
    expect(() => shallowMerge(['test'], {prop: 'oops'}))
      .toThrow(new TypeError('Both parameters should be either an Array or Object.'))
    //$FlowFixMe
    expect(() => shallowMerge({prop: 'oops'}, ['test']))
      .toThrow(new TypeError('Both parameters should be either an Array or Object.'))
  })
})
describe('composeReturn', () => {
  test('Returns the passed value, ignoring the original', () => {
    function printValue (v: string) {
      return v
    }
    const composed = composeReturn(420, printValue)
    const result = composed('Some non 420 value')
    expect(result).toEqual(420)
  })
})
describe('onCatch', () => {
  const error = new Error('Thrown error!')
  test('Calls callback with the thrown error', () => {
    const errorThrowingFn = (argument: number) => {
      throw error
    }
    const callbackSpy = jest.fn()
    const wrappedFunction = onCatch(errorThrowingFn, callbackSpy)
    wrappedFunction(2)
    expect(callbackSpy.mock.calls)
      .toEqual([
        [error, 2]
      ])
  })
  test('Returns the wrapped function\'s return-value', () => {
    const errorThrowingFn = (argument: number) => {
      return argument
    }
    const callbackSpy = jest.fn()
    const wrappedFunction = onCatch(errorThrowingFn, callbackSpy)
    const result = wrappedFunction(2)
    expect(result).toEqual(2)
  })
})
describe('throwIf', () => {
  const createError = () => new Error('Thrown error!')
  test('Throws passed error if condition is true', () => {
    const error = createError()
    expect(
      () => throwIf(true, error)
    ).toThrowError(error)
  })
  test('Throws error from function if condition is true', () => {
    const error = createError()
    expect(
      () => throwIf(true, createError)
    ).toThrowError(error)
  })
  test('Returns undefined', () => {
    expect(
      throwIf(false, createError)
    ).toEqual(undefined)
  })
})
