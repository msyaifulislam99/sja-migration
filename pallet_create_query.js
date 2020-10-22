'use strict';

const _ = require('lodash');
const data = require('./json/pallets.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/pallet_query.txt`);
for (const item of data || []) {
  file.write(
    `insert into pallets ('number','weight', 'status') values ('${item.number}',${item.weight}, 'ready'); \n`
  );
}