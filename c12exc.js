'use strict';

const { construct } = require('ramda');

const { log, assert } = console;

// 1
class Counter {
  constructor() {
    this.count = 0;
  }

  incrementBy(value) {
    this.count += value;
    return this.count;
  }
  decrementBy(value) {
    this.count -= value;
    return this.count;
  }
}

function call(obj, method, ...args) {
  const fn = Reflect.get(obj, method);
  return Reflect.apply(fn, obj, args);
}

const counter = new Counter();
log(call(counter, 'incrementBy', 10));
log(call(counter, 'decrementBy', 7));
log(counter.count);

// 2
const handler = {
  get: function (target, propertyName, receiver) {
    //target = sample
    //propertyName = foo
    //receiver = handler
    log(
      `target: ${target}, propertyName: ${propertyName}, receiver: ${typeof receiver}`
    );
    if (!Reflect.has(target, propertyName)) {
      if (
        Reflect.defineProperty(target, propertyName, {
          value: 'Initialized with this string', // "value", not [propertyName] !!!
        })
      ) {
        log('success');
        log(Reflect.ownKeys(target)); // ['foo']
      } else {
        log('fail');
      }
    }
    return Reflect.get(target, propertyName);
  },
};

const sample = {};
const proxy = new Proxy(sample, handler);

log(proxy.foo); // 'Initialized with this string'

/* 
defineProperty attributes in the property descriptor object:

Configurable. If and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. 
  Default: false.
Enumerable. If and only if this property shows up during enumer
    
*/
log('---------------');
// 3

const createRevocableProxy = function (instance) {
  const prx = Proxy.revocable(instance, {
    get: function (target, prop, __receiver) {
      return Reflect.get(target, prop).bind(target);
    },
  });
  setTimeout(prx.revoke, 3000);
  return prx.proxy;
};

const revproxy = createRevocableProxy(new Date());

log(Reflect.ownKeys(revproxy));
//revproxy.revoke();
const callGetYear = function () {
  try {
    log(1900 + revproxy.getYear());
  } catch (error) {
    log(error.message);
  }
};

callGetYear(); // current year
setTimeout(callGetYear, 1000); // current year
setTimeout(callGetYear, 5000); // should fail (proxy should be revoked after 3 seconds)

const createPlayMethodProxy = function (instance) {
  const handler = {
    get: function (target, property) {
      if (Reflect.has(target, property)) {
        return Reflect.get(target, property);
      }
      if (property.startsWith('play')) {
        const activity = property.split('play')[1];
        const activities = Reflect.get(target, 'activities');
        const hasActivity = activities.indexOf(activity) !== -1;
        if (hasActivity) {
          return function (args) {
            // return a function here to trap a function call, not just the string!
            return `I love to play ${activity}`;
          };
        } else {
          return function (args) {
            return `I can't play ${activity}`;
          };
        }
      } else {
        throw new Error(`only play methods allowed`);
      }
    },
  };

  return new Proxy(instance, handler);
};
const playproxy = createPlayMethodProxy({ activities: ['Soccer', 'Tennis'] });

log(playproxy.playTennis()); // I love to play Tennis
log(playproxy.playSoccer()); // I love to play Soccer
log(playproxy.playPolitics()); // I can't play Politics
try {
  log(playproxy.doSomething()); // only play methods allowed
} catch (e) {
  log(e.message);
}

// 5
const fruits = new Set(['Apple', 'Banana', 'Orange']);
//set the prototype of the prototype of fruits so the Set methods still apply
Reflect.setPrototypeOf(
  Reflect.getPrototypeOf(fruits),
  new Proxy(fruits, {
    get: function (target, prop, receiver) {
      if (target.has(prop)) {
        return prop;
      }
      return false;
    },
  })
);

log(fruits.size); // 3
log(fruits.Apple); // Apple
log(fruits['Banana']); // banana
log(fruits.Tomato); // false
