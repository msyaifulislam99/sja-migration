'use strict';

const _ = require('lodash');
const data = require('./json/gula_header.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/gula_header.txt`);
for (const item of data || []) {
  file.write(
    `insert into sugar_headers (arrival_at,license_plate,po_number,warehouse,ingredient_id,supplier_id,total_amount,user_id,note,grade_id,decrease_status,no_surat_jalan) values ('${item.arrival_at}','${item.license_plate}','${item.po_number}','${item.warehouse}',${item.ingredient_id},${item.supplier_id},${item.total_amount},${item.user_id},'${item.note}',${item.grade_id},'${item.decrease_status}','${item.no_surat_jalan}'); \n`
  );
}