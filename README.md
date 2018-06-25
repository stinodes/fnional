# FNional
Functional helper functions

### Why me?
Across projects, I noticed I ended up (re-)writing the same set of functions nearly every time.
This repo is supposed to be those functions and their flow-typings in one place, 
so I don't have to copy-paste them over or reinvent them every time.  

None of the functions do ground-breaking stuff. I like them 'cause they make my code look a bit prettier and easy to write.

### Why me though?
I was never really too happy with the signatures, naming, typing, size or any other property of other available library.
Either they offer too much bloat or just aren't what I need. These functions are supposed to be exactly the way I want them.  

Also, it's a fun thing to work on every now and then, I suppose.

## API

### getIn
Returns a property from an object.  

    getIn: (object: Object, key) => any

**Example**

    const person = {name: 'Stijn Tytgat', nickname: 'stinodes', age: 23}
    const age: number = getIn(person, 'age')

### setIn
Returns a new object with the property `key` set to `value`.

    setIn: <O: Object>(object: O, key, value) => O
    
**Example**

    const person = {name: 'Stijn Tytgat', nickname: 'stinodes', age: 23}
    const newPerson = setIn(person, 'name', 'Not my true name >:)')
    
### composeReturn
Accepts a function and a value, and returns a new function always returning the passed value, ignoring the original function's return.

    composeReturn: (returnValue: R, fn: Params => any) => Params => R

**Example**

    const logger = {log: console.log}
    logger.log = composeReturn(logger, log)
    logger.log('test')
      .log('test')
      .log('test')
      

### onCatch
Calls a callback when an error is thrown.

    onCatch: (Params => R, (Error, ...Params) => any) => (Params) => R
    
**Example**

    const returnString = (value) => {
      if (typeof value !== 'string') throw 'NOT A STRING'
      return value
    }
    const handled = onCatch(returnString, console.error)
    handled('A string')     // callback not called
    handled(420)            // callback called
    
### throwIf
Throws the given error if the condition matches

    throwIf: (condition: boolean, error: Error|() => Error) => void
    
**Example**

    const person = {name: 'Stijn'}
    const car = {brand: 'Cannot improvise a car brand'}
    function validPerson(personObject) {
      return !!personObject.name
    }
    throwIf(validPerson(person), new Error('This is no person')) // No error
    throwIf(validPerson(car), new Error('This is no person'))    // Error!
    
  
