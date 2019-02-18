const { BillItem } = require("./itemv2");

const BillPayment = {
  type: "object",
  properties: {
    method: {
      type: "string"
    },
    amount: {
      type: "integer",
      description:
        "Successful payments should be listed as a positive integer. Reversals as a negative integer."
    },
    refId: {
      type: "string",
      description:
        "Optionally provide a reference to the record of this payment to another system."
    },
    tip: {
      type: "integer",
      min: 1
    }
  },
  required: ["method", "amount"]
};

const Bill = {
  type: "object",
  properties: {
    refId: {
      type: "string"
    },
    table: {
      type: "string"
    },
    currency: {
      type: "string"
    },
    clientId: {
      type: "string"
    },
    items: {
      type: "array",
      items: BillItem
    },
    total: {
      type: "integer",
      min: 0
    },
    tax: {
      type: "integer",
      min: 0
    },
    balance: {
      type: "integer",
      min: 0
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
    "tax",
    "balance",
    "payments",
    "created",
    "updated"
  ]
};

module.exports = { Bill };
