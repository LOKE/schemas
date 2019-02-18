const Choice = {
  id: {
    type: "string",
    title: "The ID of the choice",
    description:
      "The ID of the choice is recommended for merchant orders, but mandatory for customer orders",
    default: "",
    examples: ["prod2"]
  },
  name: {
    type: "string",
    title: "The choice display name",
    default: "",
    examples: ["Soy Milk"]
  },
  amount: {
    type: "integer",
    title: "Any cost adjustment made by this choice (per-qty)",
    description: "The adjustment may be a positive or negative number",
    default: 0,
    examples: [50]
  }
};

const Option = {
  type: "object",
  properties: {
    id: {
      type: "string",
      title: "The ID of the option (set)",
      description:
        "The ID of the option is recommended for merchant orders, but mandatory for customer orders",
      default: "",
      examples: ["opt1"]
    },
    name: {
      type: "string",
      title: "Display name of the option (set)",
      default: "",
      examples: ["Milk"]
    },
    choices: {
      type: "array",
      items: {
        type: "object",
        properties: Choice
      }
    }
  }
};

const BaseItem = {
  type: "object",
  properties: {
    id: {
      type: "string",
      title: "ID of the product item",
      description:
        "The ID of the product item is recommended for merchant orders, but mandatory for customer orders",
      default: "",
      examples: ["prod1"]
    },
    name: {
      type: "string",
      title: "Display name of the product on this line item",
      default: "",
      examples: ["Flat White"]
    },
    amount: {
      type: "integer",
      title: "The cost of a single instance of this item.",
      description:
        "The cost is represented in the lowest denomination (eg cents). For discounts this should be negative.",
      examples: [350]
    },
    tax: {
      type: ["integer", "null"],
      title: "The tax of a single instance of this item",
      description:
        "The tax is represented in the lowest denomination (eg cents). For discounts this should be negative. Provided mainly for backwards compatibility.",
      examples: [32]
    },
    quantity: {
      type: "integer",
      title: "The quantity of items ordered",
      default: 0,
      examples: [2],
      minimum: 1
    },
    type: {
      type: "string",
      enum: ["discount", "adjustment", "item"],
      title: "Line item type",
      default: "item",
      examples: ["discount", "adjustment", "item"]
    }
  },
  required: ["name", "quantity", "amount"]
};

const BillItem = {
  type: "object",
  properties: Object.assign({}, BaseItem.properties, {}),
  required: BaseItem.required
};

const OrderItem = {
  type: "object",
  properties: Object.assign({}, BaseItem.properties, {
    options: {
      type: "array",
      items: Option
    }
  }),
  required: BaseItem.required
};

module.exports = { Choice, Option, OrderItem, BillItem };
