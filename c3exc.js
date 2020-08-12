'use strict';
const R = require('ramda');

const { log, assert } = console;

const roundTo = R.curry(
  (digits, amount) => Math.round(amount * 10 ** digits) / 10 ** digits
);

const roundTo2 = roundTo(2);

const amountAfterTaxes = (amount, ...taxRates) =>
  roundTo2(taxRates.reduce((acc, tax) => acc + (amount / 100) * tax, amount));

const amount = 25.12;
const fedTax = 10;
const stateTax = 2;
const localTax = 0.5;

log(amountAfterTaxes(amount));
log(amountAfterTaxes(amount, fedTax));
log(amountAfterTaxes(amount, fedTax, stateTax));
log(amountAfterTaxes(amount, fedTax, stateTax, localTax));

const purchaseItems = (...params) =>
  params
    .reduce(
      (acc, param) =>
        Array.isArray(param) ? [...acc, param.join(', ')] : [...acc, param],
      []
    )
    .join(', ');

log(purchaseItems('milk', 'eggs'));

const mustHaves = ['bread', 'milk'];
const andAlso = ['eggs', 'donuts'];

log(purchaseItems(mustHaves, andAlso, andAlso));

const placeOrder = function (
  id,
  price,
  shipping = shipping < 20 ? 5 : 10,
  date = new Date()
) {
  console.log(
    `shipping charge for id ${id} is $${shipping}, date: ${date.getDate()}`
  );
};

// is this an error in the exercise description? Why decimal values for amount?
placeOrder(1, 12.1, 3, new Date('05/15/2018'));
placeOrder(1, 25.2, 10);
placeOrder(1, 12.5);
