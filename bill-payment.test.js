const test = require("ava");

const { makeTestHelper } = require("./_test-helper");
const { BillPayment } = require("./bill");

const testMacro = makeTestHelper(BillPayment, {
  name: "Cash moneyz",
  total: 1000,
  refId: "REF1",
  tip: 100
});

test("valid payment", testMacro, {}, { isValid: true });

test("no name", testMacro, { name: undefined }, { isValid: false });
test("empty name", testMacro, { name: "" }, { isValid: false });

test("no total", testMacro, { total: undefined }, { isValid: false });
test("negative total", testMacro, { total: -100 }, { isValid: true });

test("no refId", testMacro, { refId: undefined }, { isValid: true });
test("empty refId", testMacro, { refId: "" }, { isValid: false });

test("no tip", testMacro, { tip: undefined }, { isValid: true });
test("negative tip", testMacro, { tip: -100 }, { isValid: false });
