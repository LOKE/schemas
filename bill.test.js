const test = require("ava");

const { makeTestHelper } = require("./_test-helper");
const { Bill } = require("./bill");

const testMacro = makeTestHelper(Bill, {
  id: "bill1",
  table: "123",
  currency: "AUD",
  items: [
    {
      id: "ITEM1",
      name: "Item 1",
      amount: 660,
      tax: 60,
      quantity: 1,
      type: "item"
    },
    {
      id: "ITEM2",
      name: "Item 2",
      amount: 660,
      tax: 60,
      quantity: 1,
      type: "item"
    },
    {
      name: "Some Discount",
      amount: -220,
      tax: -20,
      quantity: 1,
      type: "discount"
    }
  ],
  total: 1100,
  tax: 100,
  balance: 500,
  payments: [
    {
      total: 600,
      name: "Cash",
      refId: "PR1",
      tip: 100
    }
  ],
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  completed: new Date().toISOString()
});

test("valid bill", testMacro, {}, { isValid: true });

test("no id", testMacro, { id: undefined }, { isValid: false });

test("no table", testMacro, { table: undefined }, { isValid: true });
test("empty table", testMacro, { table: "" }, { isValid: false });

test("no currency", testMacro, { currency: undefined }, { isValid: false });
test("wrong currency", testMacro, { currency: "XYZ" }, { isValid: false });

test("no total", testMacro, { total: undefined }, { isValid: false });
test("negative total", testMacro, { total: -100 }, { isValid: false });
test("zero total", testMacro, { total: 0 }, { isValid: false });

test("no tax", testMacro, { tax: undefined }, { isValid: true });
test("negative tax", testMacro, { tax: -100 }, { isValid: false });
test("zero tax", testMacro, { tax: 0 }, { isValid: true });

test("no balance", testMacro, { balance: undefined }, { isValid: false });
test("negative balance", testMacro, { balance: -100 }, { isValid: false });
test("zero balance", testMacro, { balance: 0 }, { isValid: true });

test("no created", testMacro, { created: undefined }, { isValid: false });
test(
  "invalid created date",
  testMacro,
  { created: "NOT A DATE" },
  { isValid: false }
);

test("no updated", testMacro, { updated: undefined }, { isValid: false });
test(
  "invalid updated date",
  testMacro,
  { updated: "NOT A DATE" },
  { isValid: false }
);

test("no completed", testMacro, { completed: undefined }, { isValid: true });
test(
  "invalid completed date",
  testMacro,
  { completed: "NOT A DATE" },
  { isValid: false }
);

// More on items here
test(
  "empty items",
  testMacro,
  { items: [] },
  {
    isValid: true
  }
);
test(
  "no items",
  testMacro,
  { items: undefined },
  {
    isValid: false
  }
);

// More on payments
test(
  "empty payments",
  testMacro,
  { payments: [] },
  {
    isValid: true
  }
);
test(
  "no payments",
  testMacro,
  { payments: undefined },
  {
    isValid: false
  }
);
