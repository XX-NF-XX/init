const { createObject } = require('../index');

describe('/index.js test', () => {
  describe('createObject()', () => {
    test('Should return object with three op* props.', async () => {
      const obj = createObject(3);
      expect(obj).toMatchObject({ op1: 1, op2: 2, op3: 3 });
    });

    test('Should return empty object when called with invalid params.', async () => {
      const obj = createObject('12a');
      expect(obj).toMatchObject({});
    });
    test('Should return empty object when called without params.', async () => {
      const obj = createObject();
      expect(obj).toMatchObject({});
    });
  });
});
