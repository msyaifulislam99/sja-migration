'use strict';
const excelToJson = require('convert-excel-to-json');

const fs = require('fs');

const result = excelToJson({
  sourceFile: './excels/tbl_pengeluarandet.xlsx',
  columnToKey: {
    A: 'current_id',
    B: 'id_pengeluaran',
    C: 'no_pallet',
    D: 'berat_bruto',
    E: 'berat_pallet',
    F: 'berat_netto',
    G: 'insert_date',
    H: 'insert_by',
    I: 'mod_date',
    J: 'mod_by',
    K: 'status_id',
    L: 'jml_karung',
    M: 'tgl_timbang',
    N: 'kode_bahan',
    O: 'id_penerimaandet'
	}
});
// console.log(result);

let i = 1;
for (const item of result.tbl_pengeluarandet || []) {
  item['expected_id'] = i;
  i++;
}
let data = JSON.stringify(result.tbl_pengeluarandet);
fs.writeFileSync('json/tbl_pengeluarandet.json', data);