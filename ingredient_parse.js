'use strict';
const tbl_penerimaan = require('./json/tbl_penerimaan.json');
const _ = require('lodash');
const fs = require('fs');

// filter ingredient
const result = _.uniqBy(tbl_penerimaan, function (e) {
  return e.ingredient;
});

const ingredient = [];
let expected_id = 1;
for (const item of result || []) {
  const temp = {
    expected_id,
    code: item.ingredient || '',
    name: item.ingredient || '',
    status: 'active',
  };
  ingredient.push(temp);
  expected_id++;
}

let data = JSON.stringify(ingredient);
fs.writeFileSync('json/ingredients.json', data);