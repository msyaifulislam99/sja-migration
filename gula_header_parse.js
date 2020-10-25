'use strict';
const tbl_gula_header = require('./json/tbl_gula_header.json');
const grades = require('./json/gula_grade.json');
const ingredients = require('./json/gula_ingredients.json');
const suppliers = require('./json/gula_supplier.json');
const _ = require('lodash');
const fs = require('fs');

const arrival = [];
let expected_id = 1;
for (const item of tbl_gula_header || []) {
  const grade = _.find(grades, function(o) { return o.grade == item.grade; });
  const ingredient = _.find(ingredients, function(o) { return o.code == item.nama_bahan; });
  const supplier = _.find(suppliers, function(s) { return s.name == item.supplier && s.address == item.alamat_supplier; });
  const susut_status = (item.susut_status && item.susut_status == 1) ? 'decrease' : 'sampling';
  const temp = {
    expected_id,
    current_id: item.current_id,
    arrival_at: item.tgl_masuk,
    license_plate: item.no_kendaraan || '',
    po_number: item.no_po || '',
    warehouse: 'migration',
    total_amount: item.jml_karung_sp || 0,
    user_id: 1,
    note: '',
    grade_id: grade.expected_id,
    decrease_status: susut_status,
    no_surat_jalan: item.no_surat_jalan || '',
    ingredient_id: ingredient.expected_id,
    supplier_id: supplier ? supplier.expected_id : 15
  };
  arrival.push(temp);
  expected_id++;
}

let data = JSON.stringify(arrival);
fs.writeFileSync('json/gula_header.json', data);