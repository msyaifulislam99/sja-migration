'use strict';

const _ = require('lodash');
const gula_grade = require('./json/gula_grade.json');
const gula_ingredient = require('./json/gula_ingredients.json');
const gula_supp = require('./json/gula_supplier.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/left_gula.txt`);
for (const item of gula_ingredient || []) {
  file.write(
    `insert into ingredients (code,name,description,status) values ('${item.code}','${item.name}','-','active'); \n`
  );
}

for (const item of gula_grade || []) {
  file.write(
    `insert into grades (grade,description) values ('${item.grade}','${item.description}'); \n`
  );
}

for (const item of gula_supp || []) {
  file.write(
    `insert into suppliers (name,address) values ('${item.name}','${item.address}'); \n`
  );
}