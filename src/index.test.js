// @flow
import {getIn} from './index'

describe('getIn', () => {
  test('returns value by string key from object literal', () => {
    const object = {
      name: 'Stijn Tytgat',
      nickname: 'stinodes',
      age: 23,
    }
    const result: string = getIn(object, 'name')
    expect(
      result
    ).toEqual('Stijn Tytgat')
  })
  test('returns value by number key from array', () => {
    const arr = ['potato', 'tomato', 'sprout', 'banana', 'apple']
    const result: string = getIn(arr, 3)
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

})
