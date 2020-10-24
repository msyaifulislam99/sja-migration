'use strict';

const _ = require('lodash');
const data = require('./json/ingredients.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/ingredients_query.txt`);
for (const item of data || []) {
  file.write(
    `insert into ingredients (code,name,description,status) values ('${item.code}','${item.name}','-','active'); \n`
  );
}