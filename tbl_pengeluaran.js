'use strict';
const excelToJson = require('convert-excel-to-json');

const fs = require('fs');

const result = excelToJson({
  sourceFile: './excels/tbl_pengeluaran.xlsx',
  columnToKey: {
    A: 'current_id',
    B: 'tgl_pengeluaran',
    C: 'insert_date',
    D: 'insert_by',
    E: 'mod_date',
    F: 'mod_by',
    G: 'status_id',
    H: 'asal',
    I: 'tujuan',
    J: 'urutan',
    K: 'no_surat_jalan',
    L: 'no_lot',
    M: 'keterangan',
    N: 'no_kendaraan'
	}
});
// console.log(result);

let i = 1;
for (const item of result.tbl_pengeluaran || []) {
  item['expected_id'] = i;
  i++;
}
let data = JSON.stringify(result.tbl_pengeluaran);
fs.writeFileSync('json/tbl_pengeluaran.json', data);