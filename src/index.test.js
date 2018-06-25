// @flow
import {composeReturn, getIn, onCatch, setIn, throwIf} from './index'

type Person = {
  name: string,
  nickname: string,
  age: number,
}

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
