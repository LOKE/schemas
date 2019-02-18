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
schemas = require("@loke/schemas");

myValidator.validate(someObject, schemas.TableBills.Bill);
```
