const fs = require("fs");
const path = require("path");
const { compile } = require("json-schema-to-typescript");
const { Bill } = require("./bill");

compile(Bill, "Bill", { strictIndexSignatures: true }).then(ts =>
  fs.writeFileSync(path.join(__dirname, "./bill.d.ts"), ts)
);
