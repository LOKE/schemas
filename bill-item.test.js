const test = require("ava");

const { makeTestHelper } = require("./_test-helper");
const { BillItem } = require("./itemv2");

const testMacro = makeTestHelper(BillItem, {
  id: "ITEM1",
  name: "Item 1",
  amount: 660,
  tax: 60,
  quantity: 1,
  type: "item"
});

test("valid payment", testMacro, {}, { isValid: true });

test("no id", testMacro, { id: undefined }, { isValid: true });

test("no name", testMacro, { name: undefined }, { isValid: false });

test("no amount", testMacro, { amount: undefined }, { isValid: false });
test("negative amount", testMacro, { amount: -100 }, { isValid: true });

test("no tax", testMacro, { tax: undefined }, { isValid: true });
test("negative tax", testMacro, { tax: -100 }, { isValid: true });
test("zero tax", testMacro, { tax: 0 }, { isValid: true });

test("no quantity", testMacro, { quantity: undefined }, { isValid: false });
test("negative quantity", testMacro, { quantity: -1 }, { isValid: false });
test("zero quantity", testMacro, { quantity: 0 }, { isValid: false });

test("no type", testMacro, { type: undefined }, { isValid: true });
test("item type", testMacro, { type: "item" }, { isValid: true });
test("discount type", testMacro, { type: "discount" }, { isValid: true });
test("adjustment type", testMacro, { type: "adjustment" }, { isValid: true });
test("invalid type", testMacro, { type: "something else" }, { isValid: false });
