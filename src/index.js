const fs = require('fs');

const nodeEs = require('./nodeFeatures');

/**
 * Fills obj with props like { op1: 1, op2: 2 ... op8: 8 }
 */
function createObject(amount) {
  // Parameter reassign
  amount = ~~amount;

  const obj = {};
  for (let i = 0; i <= amount; i++) {
    const paramName = `op${i}`;
    obj[paramName] = i;
  }
  return obj;
}

/**
 * Prettier formatting
 */
function prettierFormat({ op1, op2, op3, op4, op5, op6, op7, op8 }) {
  const obj1 = { par1: op1, par2: op2, par3: op3, par4: op4, par5: op5, par6: op6, par7: op7 };
  console.log(obj1);

  const obj2 = {
    par1: op1,
    par2: { op1, op2, op3 },
    par3: op3,
    par4: op4,
    par5: op5,
    par6: op6,
    par7: op7,
    par8: op8,
  };
  console.log(obj2);
}

async function test() {
  console.log(`Current file size: ${fs.statSync(__filename).size} bytes\n`);

  console.group('Node ES features:');

  await nodeEs.es2019();
  await nodeEs.es2020();
  await nodeEs.esNext();

  console.groupEnd();

  console.group('\nRules:');
  // Plus-plus features
  let x = 0;
  x++;
  x--;
  x += 1;

  // Bitwise features
  const str = `${x}000`; // 1000
  console.log('typeof ~~str is', typeof ~~str);
  console.log('value of ~~str is', ~~str);

  // Destructuring features
  const obj = createObject(8);
  prettierFormat(obj);

  // Use before defined feature
  beforeDefined();

  console.groupEnd();
}

function beforeDefined() {
  console.log('Using before defined: Hello there!');
}

test()
  .then(() => console.log('\nTest finished'))
  .catch(err => console.error('\nSomething went wrong!', err));

module.exports = {
  test,
  createObject,
};
