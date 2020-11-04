'use strict';
const tbl_gula_header = require('./json/tbl_gula_header.json');
const current_ingredient = require('./json/ingredients.json');
const _ = require('lodash');
const fs = require('fs');

var filtered = _.uniqBy(tbl_gula_header, function (e) {
  return e.nama_bahan;
});
const ingredients = [];
let current_max_id = _.maxBy(current_ingredient, 'expected_id');
let expected_id = current_max_id.expected_id + 1;
for (const item of filtered || []) {
  const temp = {
    expected_id,
    code: item.nama_bahan || '',
    name: item.nama_bahan || '',
  };
  ingredients.push(temp);
  expected_id++;
}

let data = JSON.stringify(ingredients);
fs.writeFileSync('json/gula_ingredients.json', data);