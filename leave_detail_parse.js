'use strict';
const tbl_pengeluarandet = require('./json/tbl_pengeluarandet.json');
const pallets = require('./json/pallets.json');
const leaves = require('./json/leaves.json');
const detail_arrivals = require('./json/detail_arrivals.json');
const _ = require('lodash');
const fs = require('fs');

const detail_leave = [];
const arrival_deleted = _.filter(detail_arrivals, {status: 'deleted'});
const leave_filter_deteled = _.filter(tbl_pengeluarandet, {status_id: 1});
let expected_id = 1;
for (const item of leave_filter_deteled || []) {
  const leave = _.find(leaves, function(o) { return o.current_id == item.id_pengeluaran; });
  const pallet = _.find(pallets, function(s) { return s.number == item.no_pallet; });
  const deleted_from_arrival = _.find(arrival_deleted, function(o) { return o.current_id == item.id_penerimaandet; });
  const detail_arrival = _.find(detail_arrivals, function(s) { return s.current_id == item.id_penerimaandet; });
  console.log(item, pallet, deleted_from_arrival, detail_arrival, 'asu');
  if (!deleted_from_arrival) {
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
}

let data = JSON.stringify(detail_leave);
fs.writeFileSync('json/detail_leaves.json', data);