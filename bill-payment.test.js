const test = require("ava");

const { makeTestHelper } = require("./_test-helper");
const { BillPayment } = require("./bill");

const testMacro = makeTestHelper(BillPayment, {
  method: "Cash moneyz",
  amount: 1000,
  refId: "REF1",
  tip: 100
});

test("valid payment", testMacro, {}, { isValid: true });

test("no method", testMacro, { method: undefined }, { isValid: false });
test("empty method", testMacro, { method: "" }, { isValid: false });

test("no amount", testMacro, { amount: undefined }, { isValid: false });
test("negative amount", testMacro, { amount: -100 }, { isValid: true });

test("no refId", testMacro, { refId: undefined }, { isValid: true });
test("empty refId", testMacro, { refId: "" }, { isValid: false });

test("no tip", testMacro, { tip: undefined }, { isValid: true });
test("negative tip", testMacro, { tip: -100 }, { isValid: false });
