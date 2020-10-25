'use strict';
const tbl_gula_detail = require('./json/tbl_gula_detail.json');
const _ = require('lodash');
const fs = require('fs');

// filter pallet
const result = _.uniqBy(tbl_gula_detail, function (e) {
  return e.no_pallet;
});

const pallet = [];
let expected_id = 1;
for (const item of result || []) {
  const temp = {
    expected_id,
    number: item.no_pallet || '',
    weight: item.brt_pallet || 0,
    status: 'ready',
  };
  pallet.push(temp);
  expected_id++;
}

let data = JSON.stringify(pallet);
fs.writeFileSync('json/sugar_pallets.json', data);