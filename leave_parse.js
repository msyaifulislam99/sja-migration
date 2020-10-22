'use strict';
const tbl_pengeluaran = require('./json/tbl_pengeluaran.json');
const _ = require('lodash');
const fs = require('fs');

const leave = [];
let expected_id = 1;
for (const item of tbl_pengeluaran || []) {
  const temp = {
    expected_id,
    current_id: item.current_id,
    origin: item.asal,
    destination: item.tujuan,
    license_plate: item.no_kendaraan || '',
    no_surat_jalan: item.no_surat_jalan || '',
    ride: item.urutan || '',
    description: item.keterangan || '',
    user_id: 1,
    leave_at: item.tgl_pengeluaran
  };
  leave.push(temp);
  expected_id++;
}

let data = JSON.stringify(leave);
fs.writeFileSync('json/leaves.json', data);