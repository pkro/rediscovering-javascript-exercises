'use strict';

const { and, mapObjIndexed } = require('ramda');

const { log, assert } = console;

// 1

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
  copies = 0;
  get copiesSold() {
    return this.copies;
  }
  set copiesSold(val) {
    if (+val > 0) {
      this.copies = val;
    } else {
      throw new Error('Value cant be negative');
    }
  }
}

const book = new Book('Who moved my cheese', 'Spencer Johnson', 96);
log(book.title);
log(book.pages);

log(book.copiesSold);
book.copiesSold = 1;
log(book.copiesSold);

try {
  book.copiesSold = -2;
  // book.copiesSold = 2;
} catch (e) {
  log(e.message);
}

log(book.copies);

// 2
class Tax {
  static stateRate = 0.08;
  static forAmount = function (amount) {
    return Tax.stateRate * amount;
  };
}

log(Tax.stateRate);
log(Tax.forAmount(100));

const forAmount = Tax.forAmount;
this.staterRate = 0.01;
log(forAmount.call(this, 100));

// 3

class Todo {
  ['learn js'] = 'done';
  ['write elegant code'] = 'wip';

  get completedCount() {
    return Object.keys(this).reduce(
      (acc, val) => (this[val] === 'done' ? acc + 1 : acc),
      0
    );
  }
}

const todo = new Todo();
log(todo['learn js']);
log(todo['write elegant code']);
log(todo.completedCount);

// 4
function createTodo() {
  return new Map([
    ['learn js', 'done'],
    ['write', 'wip'],
  ]);
}
function completedCount(todo) {
  return Array.from(todo.values()).filter((val) => val === 'done').length;
}

const todoMap = createTodo();
log(todoMap.get('learn js'));
log(todoMap.get('write'));
log(completedCount(todoMap));

// 5
function create(arr) {
  return new Set(arr.map((e) => e.toUpperCase()));
}
function toLowerCase(s) {
  return new Set(Array.from(s).map((e) => e.toLowerCase()));
}
const sports = create(['Soccer', 'Football', 'Cricket', 'Tennis', 'soccer']);
log(sports.has('FOOTBALL'));
log(sports.has('Football'));
log(sports.size);

const inLC = toLowerCase(sports);
log(inLC);
