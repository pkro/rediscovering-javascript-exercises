'use strict';

const { log, assert } = console;

// 1 + 2
class FunctionalSet extends Set {
  filter(func) {
    return new FunctionalSet([...this.values()].filter(func));
  }
  map(func) {
    return new FunctionalSet([...this.values()].map(func));
  }
  reduce(func, accumulator) {
    return [...this.values()].reduce(func, accumulator);
  }
}

const set = new FunctionalSet(['Jack', 'Jill', 'tom', 'Jerry']);

const jSet = set.filter((x) => x.startsWith('J'));
log(jSet);
const allCaps = set.map((x) => x.toUpperCase());
log(allCaps);

const totalLengthOfWords = set
  .filter((name) => name.startsWith('J'))
  .reduce((total, word) => total + word.length, 0);

log(totalLengthOfWords);

const reducedSet = set.reduce(
  (acc, val) => acc.add(`YAY ${val}`),
  new FunctionalSet()
);
log(reducedSet);

const set2 = new FunctionalSet(['Jack', 'Jill', 'tom', 'Jerry']).add('Bill');
log(set2);

// 3
class BoundedSet extends Set {
  constructor(capacity, iterable) {
    if (iterable.length <= capacity) {
      super(iterable);
    } else {
      super([]);
    }
    this.capacity = capacity;
  }
  add(item) {
    if (this.size >= this.capacity) {
      throw new Error(`exceeded capacity of ${this.capacity} items`);
    }
    super.add(item);
  }

  toString() {
    return `BoundedSet { capacity: ${this.capacity}}`;
  }
}

//const set3 = new BoundedSet(5, [1, 2, 3, 4, 5, 6]); // error
const set3 = new BoundedSet(5, [1, 2, 3, 4]);
log(set3);
set3.add(5);
try {
  set3.add(6);
} catch (error) {
  log(error.message);
}

const set4 = new BoundedSet(2, [1, 2, 3]);
log(set4.size);
log(set4);

// 4

class Base {
  copy() {
    const constructor =
      Reflect.getPrototypeOf(this).constructor[Symbol.species] ||
      Reflect.getPrototypeOf(this).constructor;
    if (this[Symbol.species]) {
      return new this[Symbol.species]();
    }
    return new Base();
  }
}

class Derived1 extends Base {}

class Derived2 extends Base {
  get [Symbol.species]() {
    return this.constructor; // derived2
  }
}

const derived1 = new Derived1();
const derived2 = new Derived2();

log(derived1.copy());
log(derived2.copy());

// 5
class SpecialWordChecker {
  isSpecial(word) {
    return word !== word;
  }
}

class PalindromeChecker extends SpecialWordChecker {
  isSpecial(word) {
    return word === word.split('').reverse().join('') || super.isSpecial(word);
    // return (
    //   word ===
    //   Array.from(word)
    //     .reduce((acc, letter) => [letter, ...acc], [])
    //     .join('')
    // );
  }
}
class AlphabeticalChecker extends SpecialWordChecker {
  isSpecial(word) {
    return (
      word.toLowerCase() === word.toLowerCase().split('').sort().join('') ||
      super.isSpecial(word)
    );
  }
}

const checkIfSpecial = function (specialWordChecker, word) {
  const result = specialWordChecker.isSpecial(word) ? 'is' : 'is not';
  log(`${word} ${result} special`);
};

const palindromeChecker = new PalindromeChecker();
checkIfSpecial(palindromeChecker, 'mom');
checkIfSpecial(palindromeChecker, 'abe');

const alphabeticalChecker = new AlphabeticalChecker();
checkIfSpecial(alphabeticalChecker, 'mom');
checkIfSpecial(alphabeticalChecker, 'abe');

// Code in the derived classes need to call super for this to work
const alphabeticalAndPalindromeChecker = Object.setPrototypeOf(
  Object.getPrototypeOf(new AlphabeticalChecker()),
  new PalindromeChecker()
);

checkIfSpecial(alphabeticalAndPalindromeChecker, 'mom');
checkIfSpecial(alphabeticalAndPalindromeChecker, 'abe');
