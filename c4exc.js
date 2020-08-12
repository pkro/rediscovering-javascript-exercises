'use strict';
const { log, assert } = console;

// 1
const letters = 'abcdefgh'.split('');

for (let l of letters) {
  log(l);
}

// 2
const numbers = [1, 2, 3];
log(Object.getOwnPropertySymbols(Object.getPrototypeOf(numbers)));

// #3
class Message {
  constructor(text) {
    this.text = text;
  }
  [Symbol.replace](search, replace) {
    return this.text.replace(search, replace);
  }
}

const message = new Message('there are no stupid questions');

log('stupid'.replace(message, 's*****'));
log(''.replace(message, 'Yes, '));

// #4 + #5

function* fibbonacciSeries() {
  let x = 1;
  let y = 1;
  for (let i = 0; i < Infinity; i++) {
    yield [i, x + y];
    [x, y] = [x + y, x];
  }
}
for (const [idx, value] of fibbonacciSeries()) {
  //if (value > 25) {
  if (idx > 8) {
    break;
  }
  log(value + ',');
}

// #5
