'use strict';
const tbl_gula_header = require('./json/tbl_gula_header.json');
const _ = require('lodash');
const fs = require('fs');

var filtered = _.uniqBy(tbl_gula_header, function (e) {
  return e.grade;
});
const suppliers = [];
let expected_id = 1;
for (const item of filtered || []) {
  const temp = {
    expected_id,
    grade: item.grade,
    description: `Gula Grade ${item.grade}`
  };
  suppliers.push(temp);
  expected_id++;
}

let data = JSON.stringify(suppliers);
fs.writeFileSync('json/gula_grade.json', data);