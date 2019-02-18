const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

exports.makeTestHelper = (schema, validInstance) => {
  const validate = ajv.compile(schema);

  const makeValidInstance = (override = {}) => {
    return Object.assign({}, validInstance, override);
  };

  const testMacro = (t, input, expected) => {
    const instance = makeValidInstance(input);
    const valid = validate(instance);
    if (!valid && expected.isValid) {
      t.fail("Expected valid, got errors " + JSON.stringify(validate.errors));
    }
    t.is(valid, expected.isValid);
    if (expected.errors) {
      t.deepEqual(validate.errors, expected.errors);
    }
  };

  return testMacro;
};
