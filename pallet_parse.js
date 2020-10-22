'use strict';
const tbl_penerimaandet = require('./json/tbl_penerimaandet.json');
const _ = require('lodash');
const fs = require('fs');

// filter pallet
const result = _.uniqBy(tbl_penerimaandet, function (e) {
  return e.pallet_number;
});

const pallet = [];
let expected_id = 1;
for (const item of result || []) {
  const temp = {
    expected_id,
    number: item.pallet_number || '',
    weight: item.pallet_weight || 0,
    status: 'ready',
  };
  pallet.push(temp);
  expected_id++;
}

let data = JSON.stringify(pallet);
fs.writeFileSync('json/pallets.json', data);