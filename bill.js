const { BillItem } = require("./itemv2");

const BillPayment = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Method of payment or payment label",
      minLength: 1,
      examples: ["Cash", "App Payment - John Smith"]
    },
    total: {
      type: "integer",
      description:
        "The total amount paid on this payment instance *inclusive of tips*. Successful payments should be listed as a positive integer. Reversals as a negative integer.",
      examples: [1200]
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
      description: "Tip included in in this payment.",
      minimum: 1,
      examples: [100]
    }
  },
  required: ["name", "total"]
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
      description:
        "List of items associated with this bill. *NOTE: may include discounts.*",
      items: BillItem
    },
    total: {
      type: "integer",
      description:
        "Total amount that must be paid on this bill, ignoring any payments currently made. *Inclusive of any tax.*",
      minimum: 1,
      examples: [1100]
    },
    tax: {
      type: "integer",
      description:
        "Tax amount included on bill. This is highly recommended as it provided better feedback to the customer, but not required.",
      minimum: 0,
      examples: [100]
    },
    balance: {
      type: "integer",
      description:
        "Balance remaining on this bill. This will be the total, minus any payments already made on the bill.",
      minimum: 0,
      examples: [500]
    },
    payments: {
      type: "array",
      description: "Any existing payments made on this bill.",
      items: BillPayment
    },
    created: {
      type: "string",
      format: "date-time",
      description: "Timestamp this bill was created."
    },
    updated: {
      type: "string",
      format: "date-time",
      description: "Timestamp this bill was last updated."
    },
    completed: {
      type: "string",
      format: "date-time",
      description: "Timestamp this bill was completed (if applicable)."
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
