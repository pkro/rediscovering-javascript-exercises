'use strict';

const { log, assert } = console;

// 1
const printProperties = function (obj) {
  Object.getOwnPropertyNames(obj).map((propName) =>
    log(`${propName} is ${obj[propName]}`)
  );
};

printProperties({ language: 'JS', typing: 'Dynamic' });

// 2
Number.prototype.percent = function () {
  // prototype if it should be an instance method, Number.percent if it should be a static method
  if (this >= 1) {
    throw new Error('Value should be less than 1');
  }
  return `${this * 100}%`;
};

log(new Number(0.4).percent());
const val1 = 0.35;
const val2 = 0.91;

log(val1.percent());
log(val2.percent());

try {
  const val3 = 44;
  log(val3.percent());
} catch (e) {
  log(e.message);
}

// 3
Object.defineProperties(Number.prototype, {
  // !!!! prototype!
  integerPart: {
    get() {
      return +this.toString().split('.')[0];
    },
  },
  fractionalPart: {
    get() {
      return +this.toString().split('.')[1];
    },
  },
});

const printParts = function (number) {
  log(`whole: ${number.integerPart} decimal: ${number.fractionalPart}`);
};

printParts(22.12);
printParts(0.12);
printParts(-23.19);

// 4

Set.prototype.combine = function (other) {
  return new Set([...this, ...other]);
};
const names1 = new Set(['Tom', 'Sara', 'Brad', 'Kim']);
const names2 = new Set(['Mike', 'Kate']);

const combinedNames = names1.combine(names2);

log(names1.size);
log(names2.size);
log(combinedNames.size);
log(combinedNames);


// 5
/*
to add to instance: just use the object instead of the classname; 
*/