'use strict';
const tbl_gula_header = require('./json/tbl_gula_header.json');
const current_supplier = require('./json/suppliers.json');
const _ = require('lodash');
const fs = require('fs');

var filtered_suppliers = _.uniqBy(tbl_gula_header, v => [v.supplier, v.alamat_supplier].join());
const suppliers = [];
let current_max_id = _.maxBy(current_supplier, 'expected_id');
let expected_id = current_max_id + 1;
for (const item of filtered_suppliers || []) {
  if (item.supplier && item.alamat_supplier) {
    const temp = {
      expected_id,
      name: item.supplier || '',
      address: item.alamat_supplier || ''
    };
    suppliers.push(temp);
    expected_id++;
  }
}

let data = JSON.stringify(suppliers);
fs.writeFileSync('json/gula_supplier.json', data);