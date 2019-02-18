const { BillItem } = require("./itemv2");

const BillPayment = {
  type: "object",
  properties: {
    method: {
      type: "string",
      minLength: 1
    },
    amount: {
      type: "integer",
      description:
        "Successful payments should be listed as a positive integer. Reversals as a negative integer."
    },
    refId: {
      type: "string",
      title: "Reference ID",
      description:
        "Optionally provide a reference to the record of this payment to another system.",
      examples: ["PAY0012", "229383773878"],
      minLength: 1
    },
    tip: {
      type: "integer",
      minimum: 1
    }
  },
  required: ["method", "amount"]
};

const Bill = {
  type: "object",
  title: "Bill",
  description:
    "Represents a bill for items to be paid by one or more customers",
  properties: {
    refId: {
      type: "string",
      title: "Reference ID",
      description:
        "Reference identifier for this bill in another system, typically the remote service's bill ID.",
      minLength: 3,
      examples: ["BILL001"]
    },
    table: {
      type: "string",
      description: "Table number if applicable.",
      minLength: 1,
      examples: ["16"]
    },
    currency: {
      type: "string",
      title: "Bill currency.",
      description: "Currency used on this bill.",
      enum: ["AUD", "NZD", "SGD", "GBP"]
    },
    clientId: {
      type: "string",
      title: "Client ID associated with this bill",
      examples: ["2kjanduif288in8sjs"],
      minLength: 1
    },
    items: {
      type: "array",
      items: BillItem
    },
    total: {
      type: "integer",
      minimum: 1,
      examples: [1100]
    },
    tax: {
      type: "integer",
      description:
        "Tax amount included on bill. This is highly recommended, but not required.",
      minimum: 0,
      examples: [100]
    },
    balance: {
      type: "integer",
      minimum: 0,
      examples: [500]
    },
    payments: {
      type: "array",
      items: BillPayment
    },
    created: {
      type: "string",
      format: "date-time"
    },
    updated: {
      type: "string",
      format: "date-time"
    },
    completed: {
      type: "string",
      format: "date-time"
    }
  },
  required: [
    "refId",
    "currency",
    "clientId",
    "items",
    "total",
    "balance",
    "payments",
    "created",
    "updated"
  ]
};

module.exports = { Bill, BillPayment };
