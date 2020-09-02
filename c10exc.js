'use strict';

const fs_tmp = require('fs').promises; // can't just import 'fs/promises' for some reason

const { log, assert } = console;
log(__filename);

// 1
// yes

//2
// no (if one is rejected it terminates)

// 3
// fs_tmp
//   .readFile(__filename)
//   .then((content) => log(content.toString()))
//   .catch((err) => log(`Oh no ${err}`));

// 4
const fs = require('fs-extra');
const request = require('request-promise');

const createTimeout = function (timeInMillis) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject(`timeout after ${timeInMillis}`), timeInMillis);
  });
};

const countPrimes = function (number) {
  if (isNaN(number)) {
    return Promise.reject(`'${number}' is not a number`);
  }

  return Promise.race([
    request(`http://localhost:8084?number=${number}`).then(
      (count) => `Number of primes from 1 to ${number} is ${count}`
    ),
    createTimeout(2000),
  ]);
};

// const countPrimesForEachLine = function (pathToFile) {
//   fs.readFile(pathToFile)
//     .then((content) => content.toString())
//     .then((content) => content.split('\n'))
//     .then((lines) => Promise.all(lines.map(countPrimes)))
//     .then((counts) => console.log(counts))
//     .catch((error) => console.log(error));
// };

// countPrimesForEachLine('./numbers.txt');

//5

const async_countPrimesForEachLine = async function (pathToFile) {
  try {
    const content = await fs.readFile(pathToFile);
    content
      .toString()
      .split('\n')
      .map(countPrimes)
      .map((line) => console.log(line));
  } catch (error) {
    console.log(error);
  }
};

async_countPrimesForEachLine('./numbers.txt');
