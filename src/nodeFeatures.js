/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
function fromEntries() {
  const map = new Map([
    ['foo', 42],
    ['bar', 23],
  ]);
  const object = Object.fromEntries(map);
  return object.foo === 42 && object.bar === 23;
}

function startEndTrims() {
  return (
    ' \t \n abc   \t\n'.trimLeft() === 'abc   \t\n' &&
    ' \t \n abc   \t\n'.trimStart() === 'abc   \t\n' &&
    ' \t \n abc   \t\n'.trimRight() === ' \t \n abc' &&
    ' \t \n abc   \t\n'.trimEnd() === ' \t \n abc'
  );
}

function arrayFlat() {
  return [1, [2, 3], [4, [5, 6]]].flat().join('') === '12345,6';
}

function arrayFlatMap() {
  return (
    [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ]
      .flatMap(it => [it.a, it.b])
      .join('') === '1234'
  );
}

async function optionalCatch() {
  let basic = false;
  let async = false;

  try {
    throw new Error();
  } catch {
    basic = true;
  }

  try {
    await Promise.reject();
  } catch {
    async = true;
  }

  return basic && async;
}

function symbolDescription() {
  return (
    Symbol('foo').description === 'foo' &&
    Symbol('').description === '' &&
    Symbol.prototype.hasOwnProperty('description') && // eslint-disable-line no-prototype-builtins
    Symbol().description === undefined // eslint-disable-line symbol-description
  );
}

function matchAll() {
  const iterator = '11a2bb'.matchAll(/(\d)(\D)/g);
  if (iterator[Symbol.iterator]() !== iterator) return false;
  let a = '';
  let b = '';
  let c = '';
  let step;
  // eslint-disable-next-line no-cond-assign
  while (!(step = iterator.next()).done) {
    a += step.value[0];
    b += step.value[1];
    c += step.value[2];
  }
  return a === '1a2b' && b === '12' && c === 'ab';
}

async function allSettled() {
  const error = new Error('2');
  const promises = await Promise.allSettled([
    Promise.resolve(1),
    Promise.reject(error),
    Promise.resolve(3),
  ]);
  return (
    promises.length === 3 &&
    promises[0].status === 'fulfilled' &&
    promises[0].value === 1 &&
    promises[1].status === 'rejected' &&
    promises[1].reason === error &&
    promises[2].status === 'fulfilled' &&
    promises[2].value === 3
  );
}

function thisGlobal() {
  return global === globalThis;
}

function instanceClassFields() {
  class Test {
    #private = 'private';
    public = 'public';
    ['computed field'] = 'computed';

    constructor() {
      this.#private += ' field';
      this.public += ' field';
      this['computed field'] += ' field';
    }
    test() {
      return (
        this.#private === 'private field' &&
        this.public === 'public field' &&
        this['computed field'] === 'computed field'
      );
    }
  }

  const test = new Test();
  test.private = 'public';
  return test.private === 'public' && test.test();
}

function weakReference() {
  const object = {};
  let weakref;
  try {
    weakref = new WeakRef(object);
  } catch (err) {
    return false;
  }
  return weakref.deref() === object;
}

function staticClassFields() {
  class Test {
    static #private = 'private';
    static public = 'public';
    static ['computed field'] = 'computed';

    static getPrivate() {
      return Test.#private;
    }
  }

  Test.private = 'public';
  return (
    Test.private === 'public' &&
    Test.getPrivate() === 'private' &&
    Test.public === 'public' &&
    Test['computed field'] === 'computed'
  );
}

function optionalChaining() {
  // N/A in node 12.x.x (available since 13.7.0 with harmony flag)

  // const object = {
  //   prop: 42,
  //   func: () => 42,
  // };
  // const variable = null;
  //
  // return (
  //   object?.prop === 42 &&
  //   variable?.prop === undefined &&
  //   object?.['prop'] === 42 &&
  //   variable?.['prop'] === undefined &&
  //   object?.func() === 42 &&
  //   variable?.func() === undefined
  // );
  return false;
}

function bigInt() {
  return 40n + 2n === 42n && BigInt(42) === 42n;
}

async function es2019() {
  console.group('ES2019 features:');

  console.log('Object.fromEntries():', fromEntries());
  console.log('String trimLeft / trimRight / trimStart / trimEnd:', startEndTrims());
  console.log('Array.flat():', arrayFlat());
  console.log('Array.flatMap():', arrayFlatMap());
  console.log('Optional catch:', await optionalCatch());
  console.log('Symbol.description:', symbolDescription());

  console.groupEnd();
}

async function es2020() {
  console.group('ES2020 features:');

  console.log('String.matchAll():', matchAll());
  console.log('Promise.allSettled():', await allSettled());

  console.groupEnd();
}

async function esNext() {
  console.group('ESNEXT features:');

  console.log('globalThis:', thisGlobal());
  console.log('Instance private/public class fields:', instanceClassFields());
  console.log('Static private/public class fields:', staticClassFields());
  console.log('Weak references:', weakReference());
  console.log('Optional chaining operator (?.):', optionalChaining());
  console.log('BigInt:', bigInt());

  console.groupEnd();
}

module.exports = {
  es2019,
  es2020,
  esNext,
};
