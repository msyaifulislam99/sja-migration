'use strict';

const _ = require('lodash');
const data = require('./json/sugar_pallets.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/sugar_pallet_query.txt`);
for (const item of data || []) {
  file.write(
    `insert into sugar_pallets (number,weight,status) values ('${item.number}',${item.weight}, 'ready'); \n`
  );
}