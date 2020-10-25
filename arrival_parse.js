'use strict';
const tbl_penerimaan = require('./json/tbl_penerimaan.json');
const suppliers = require('./json/suppliers.json');
const ingredients = require('./json/ingredients.json');
const _ = require('lodash');
const fs = require('fs');

const arrival = [];
let expected_id = 1;
for (const item of tbl_penerimaan || []) {
  const ingredient = _.find(ingredients, function(o) { return o.code == item.ingredient; });
  const supplier = _.find(suppliers, function(s) { return s.name == item.supplier_name && s.address == item.supplier_address; });
  const temp = {
    expected_id,
    current_id: item.current_id,
    license_plate: item.license_plate,
    arrival_at: item.arrival_at || '',
    lot_number: item.no_lot || '',
    ingredient_id: ingredient ? ingredient.expected_id : 23,
    supplier_id: supplier ? supplier.expected_id : 15,
    user_id: 1,
    water_content: item.water_content || 0,
    no_surat_jalan: item.no_surat_jalan || '',
  };
  arrival.push(temp);
  expected_id++;
}

let data = JSON.stringify(arrival);
fs.writeFileSync('json/arrivals.json', data);