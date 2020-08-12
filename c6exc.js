'use strict';

const { and } = require('ramda');

const { log, assert } = console;

// 1

const greet = function (name, gender) {
  return `Hello, ${gender === Symbol.for('female') ? 'Ms' : 'Mr'} ${name}`;
};

log(greet('sara', Symbol.for('female')));
log(greet('tom', Symbol.for('male')));

// 2 hmmmm
const name = 'jane';
function stripMargin(textAr, ...replAr) {
  log(textAr);
  return textAr
    .map(
      (element, idx) =>
        `${element.replace(/\s+/g, ' ').trim()} ${
          replAr[idx] ? replAr[idx] : ''
        }`
    )
    .join(' ');
}
const processed = stripMargin` This is for
  ${name} and it needs to be 
      delivered by x`;

log(processed);

// 3
const beforeAndAfter = function (number) {
  if (number < 0) return [];
  if (number === 0) return [1];
  return [number - 1, number + 1];
};

let before = 0,
  after = 0;
[before = 0, after = 0] = beforeAndAfter(7);
log(`${before} and ${after}`);

[before = 0, after = 0] = beforeAndAfter(9);
log(`${before} and ${after}`);

[before = 0, after = 0] = beforeAndAfter(0);
log(`${before} and ${after}`);

[before = 0, after = 0] = beforeAndAfter(-1);
log(`${before} and ${after}`);

// 4
const purchaseItems = function (essential1, essential2, ...optionals) {
  log(`${essential1}, ${essential2}, ${optionals.join(', ')}`);
};

const mustHaves = ['bread', 'milk'];
const also = ['eggs', 'donuts'];
const andAlso = ['juice', 'tea'];

purchaseItems(...mustHaves, ...also, ...andAlso);

// 5

const getDetails = function ({
  name,
  born: { year },
  graduated: { year: gyear },
}) {
  log(`${name} born in the year ${year}, graduated in ${gyear}`);
};
const details = getDetails({
  name: 'sara',
  born: { month: 1, day: 1, year: 2000 },
  graduated: { month: 5, day: 31, year: 2018 },
});
