const fs = require("fs");

const { Bill } = require("./bill");
fs.writeFileSync("./schemas/bill.json", JSON.stringify(Bill));
