'use strict';
const tbl_pengeluarandet = require('./json/tbl_pengeluarandet.json');
const pallets = require('./json/pallets.json');
const leaves = require('./json/leaves.json');
const detail_arrivals = require('./json/detail_arrivals.json');
const _ = require('lodash');
const fs = require('fs');

const detail_leave = [];
let expected_id = 1;
for (const item of tbl_pengeluarandet || []) {
  const leave = _.find(leaves, function(o) { return o.current_id == item.id_pengeluaran; });
  const pallet = _.find(pallets, function(s) { return s.number == item.no_pallet; });
  const detail_arrival = _.find(detail_arrivals, function(s) { return s.current_id == item.id_penerimaandet; });
  const temp = {
    expected_id,
    current_id: item.current_id,
    detail_arrival_id: detail_arrival.expected_id,
    pallet_id: pallet.expected_id,
    leave_id: leave.expected_id,
    pallet_number: pallet.number,
    bag_amount: item.jml_karung,
    brutto: item.berat_bruto,
    weighed_at: item.tgl_timbang,
    pallet_weight: item.berat_pallet,
    decrease_weight: 0,
    netto: item.berat_netto,
    status: 'migration'
  };
  detail_leave.push(temp);
  expected_id++;
}

let data = JSON.stringify(detail_leave);
fs.writeFileSync('json/detail_leaves.json', data);