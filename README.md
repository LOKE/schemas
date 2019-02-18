# Schemas

JSON schemas for LOKE services

- [Bill](https://devdocs.loke.com.au/content/docson/#https://devdocs.loke.com.au/content/schemas/bill.json)

## Using

Install as a node module:

```sh
npm i -S LOKE/schemas#master
```

Require in, and use in validators:

```js
const schemas = require("@loke/schemas");
myValidator.validate(someObject, schemas.TableBills.Bill);
```

For example, with Ajv:

```js
const Ajv = require("ajv");
const ajv = new Ajv();
const schemas = require("@loke/schemas");
const validate = ajv.compile(schemas.TableBills.Bill);

const isValid = validate(objToCheck);
```
