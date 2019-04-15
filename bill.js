const { BaseItem } = require("./itemv2");

const SubItem = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Display name of the option/variation/etc",
      default: "",
      examples: ["Soy Milk", "Extra Hot"]
    },
    amount: {
      type: "integer",
      title: "The cost of a single instance of this item.",
      description:
        "The cost is represented in the lowest denomination (eg cents). For discounts this should be negative.",
      examples: [100, 0]
    }
  },
  required: ["name", "amount"]
};

const BillItem = {
  type: "object",
  properties: Object.assign({}, BaseItem.properties, {
    subItems: {
      type: "array",
      items: SubItem
    }
  }),
  required: BaseItem.required
};

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
    id: {
      type: "string",
      title: "Unique ID for this bill",
      description:
        "The bill ID is the identifier for this bill from a non-LOKE system, typically the remote service's bill ID.",
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
      type: ["null", "integer"],
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
    "id",
    "currency",
    "items",
    "total",
    "balance",
    "payments",
    "created",
    "updated"
  ]
};

module.exports = { Bill, BillItem, BillPayment };
