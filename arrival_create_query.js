'use strict';

const _ = require('lodash');
const data = require('./json/arrivals.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/arrivals_query.txt`);
for (const item of data || []) {
  file.write(
    `insert into arrivals (license_plate,arrival_at,lot_number,ingredient_id,supplier_id,user_id,water_content,no_surat_jalan) values ('${item.license_plate}','${item.arrival_at}','${item.lot_number}',${item.ingredient_id},${item.supplier_id},${item.user_id},${item.water_content},'${item.no_surat_jalan}'); \n`
  );
}