'use strict';
const tbl_gula_header = require('./json/tbl_gula_header.json');
const _ = require('lodash');
const fs = require('fs');

var filtered_suppliers = _.uniqBy(tbl_gula_header, v => [v.supplier, v.alamat_supplier].join());
const suppliers = [];
let expected_id = 200;
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