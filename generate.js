const fs = require("fs");
const path = require("path");

const { Bill } = require("./bill");
fs.writeFileSync(
  path.join(__dirname, "./schemas/bill.json"),
  JSON.stringify(Bill)
);
