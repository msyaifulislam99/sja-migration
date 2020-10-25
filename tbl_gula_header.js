'use strict';
const excelToJson = require('convert-excel-to-json');

const fs = require('fs');

const result = excelToJson({
  sourceFile: './excels/tbl_gula_header.xlsx',
  columnToKey: {
    A: 'current_id',
    B: 'tgl_masuk',
    C: 'no_po',
    D: 'no_kendaraan',
    E: 'nama_bahan',
    F: 'alamat_supplier',
    G: 'jml_total',
    H: 'lokasi_timbangan',
    I: 'catatan',
    J: 'insert_date',
    K: 'insert_by',
    L: 'mod_date',
    M: 'mod_by',
    N: 'status',
    O: 'jam',
    P: 'grade',
    Q: 'supplier',
    R: 'susut_status',
    S: 'no_surat_jalan',
    T: 'jml_karung_sp'
	}
});
// console.log(result);

let i = 1;
for (const item of result.tbl_gula_header || []) {
  item['expected_id'] = i;
  i++;
}
let data = JSON.stringify(result.tbl_gula_header);
fs.writeFileSync('json/tbl_gula_header.json', data);