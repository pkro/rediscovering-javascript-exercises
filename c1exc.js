'use strict';

const { log, assert } = console;

function t1() {
  return;
  2 * 3;
}

log(t1()); //  undefined

log(('2.0' / 2) * '2.0' == (2 / 2) * 2); // true
log(('2.0' / 2) * '2.0' === (2 / 2) * 2); // true

function canVote(age) {
  if (age > 18) {
    return 'yes';
  } else if (age === 18) {
    return 'please';
  }
  return 'no';
}

assert(canVote(12) === 'no', '12');
assert(canVote('12') === 'no', `'12'`);
assert(canVote(17) === 'no', 17);
assert(canVote('@18') === 'no', '@18');
assert(canVote(18) === 'please', 18);
assert(canVote(28) === 'yes', 28);

var isPrime = function (n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return n > 1;
};

var sumOfPrimes = function (n) {
  var sum = 0;
  for (let i = 1; i <= n; i++) {
    if (isPrime(i)) sum += i;
  }
  return sum;
};

log(sumOfPrimes(10));

//In number theory, a perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. For instance, 6 has divisors 1, 2 and 3, and 1 + 2 + 3 = 6, so 6 is a perfect number.
