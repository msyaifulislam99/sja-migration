'use strict';
const excelToJson = require('convert-excel-to-json');

const fs = require('fs');

const result = excelToJson({
  sourceFile: './excels/tbl_gula_detail.xlsx',
  columnToKey: {
    A: 'id_detail_gula',
    B: 'id_header_gula',
    C: 'no_pallet',
    D: 'brt_pallet',
    E: 'jml_karung',
    F: 'berat_bruto',
    G: 'berat_netto',
    H: 'insert_date',
    I: 'insert_by',
    J: 'mod_date',
    K: 'mod_by',
    L: 'status_id'
	}
});
// console.log(result);

let i = 1;
for (const item of result.tbl_gula_detail || []) {
  item['expected_id'] = i;
  i++;
}
let data = JSON.stringify(result.tbl_gula_detail);
fs.writeFileSync('json/tbl_gula_detail.json', data);