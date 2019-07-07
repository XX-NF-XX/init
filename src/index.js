const fs = require('fs');

/**
 * Fills obj with props like { op1: 1, op2: 2 ... op8: 8 }
 */
function createObject(amount) {
  // Param reassign feature
  amount = ~~amount;

  const obj = {};
  for (let i = 0; i <= amount; i++) {
    const paramName = `op${i}`;
    obj[paramName] = i;
  }
  return obj;
}

function test2({ op1, op2, op3, op4, op5, op6, op7, op8 }) {
  const obj1 = { par1: op1, par2: op2, par3: op3, par4: op4, par5: op5, par6: op6, par7: op7 };
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

  console.log(obj1);
  console.log(obj2);
}

function test() {
  console.log(`Current file size: ${fs.statSync(__filename).size} bytes`);

  // ES6 features
  const map = new Map();
  console.log(`Map size is: ${map.size}`);

  // Plus-plus features
  let x = 0;
  x++;
  x--;
  x += 1;

  // Bitwise features
  const str = `${x}000`; // 1000
  console.log(`typeof ~~str is ${typeof ~~str}`);
  console.log(`value of ~~str is ${~~str}`);

  // Destructuring features
  const obj = createObject(8);
  test2(obj);

  // Use before defined feature
  test3();
}

function test3() {
  console.log('Hello there!');
}

test();

module.exports = {
  test,
};
