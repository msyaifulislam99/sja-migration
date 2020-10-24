'use strict';

const _ = require('lodash');
const data = require('./json/suppliers.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/suppliers_query.txt`);
for (const item of data || []) {
  file.write(
    `insert into suppliers (name,address) values ('${item.name}','${item.address}'); \n`
  );
}