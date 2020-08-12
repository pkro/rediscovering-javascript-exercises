'use strict';
const { log, assert } = console;

// 1
//Anonymous functions use dynamic scope for this and arguments object, lexical scope for all else
// Arrow functions use lexical scope throughout

// 2

const success = (value) => ({ value });

const blowup = (value) => {
  throw new Error(`blowing up with value ${value}`);
};

const process = (successFn, errorFn) => {
  const val = Math.round(Math.random() * 100, 2);
  return val > 50 ? successFn(val) : errorFn(val);
};

try {
  log(process(success, blowup));
} catch (error) {
  log(error.message);
}

// #3
const greet = (that, ...names) => console.log(that + ' ' + names.join(', '));

// exc didn't say this call can be changed but the solution does
const hellojj = greet.bind(null, 'hello', 'Jack', 'Jill');

hellojj();

// 4 not workign
const sam = {
  name: 'Sam',
  age: 2,
  play: function (toy) {
    return `I am ${this.name}, age ${this.age} with ${toy}`;
  },
};

log(sam.play('ball'));

const numbers = [1, 5, 2, 6];
let totalOfDoubleOfEven = 0;
for (const number of numbers) {
  if (number % 2 === 0) {
    totalOfDoubleOfEven += number * 2;
  }
}

log(numbers.reduce((acc, num) => (num % 2 === 0 ? acc + num * 2 : acc), 0));
log(totalOfDoubleOfEven);
