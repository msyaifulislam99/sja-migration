'use strict';
const excelToJson = require('convert-excel-to-json');

const fs = require('fs');

const result = excelToJson({
  sourceFile: './excels/tbl_penerimaan.xlsx',
  columnToKey: {
    A: 'current_id',
    B: 'license_plate',
    C: 'arrival_at',
    D: 'no_lot',
    E: 'ingredient',
    F: 'supplier_name',
    G: 'insert_at',
    H: 'insert_by',
    I: 'edited_at',
    J: 'edited_by',
    K: 'water_content',
    L: 'supplier_address',
    M: 'no_surat_jalan'
	}
});
// console.log(result);

let i = 1;
for (const item of result.tbl_penerimaan || []) {
  item['expected_id'] = i;
  i++;
}
let data = JSON.stringify(result.tbl_penerimaan);
fs.writeFileSync('json/tbl_penerimaan.json', data);