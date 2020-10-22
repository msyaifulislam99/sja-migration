'use strict';
const tbl_penerimaan = require('./json/tbl_penerimaan.json');
const _ = require('lodash');
const fs = require('fs');

var result = _.uniqBy(tbl_penerimaan, v => [v.supplier_name, v.supplier_address].join());
const suppliers = [];
let expected_id = 1;
for (const item of result || []) {
  const temp = {
    expected_id,
    name: item.supplier_name || '',
    address: item.supplier_address || ''
  };
  suppliers.push(temp);
  expected_id++;
}

let data = JSON.stringify(suppliers);
fs.writeFileSync('json/suppliers.json', data);