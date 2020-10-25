'use strict';
const tbl_penerimaan = require('./json/tbl_gula_detail.json');
const pallets = require('./json/sugar_pallets.json');
const headers = require('./json/gula_header.json');
const _ = require('lodash');
const fs = require('fs');

const detail_arrival = [];
let expected_id = 1;
for (const item of tbl_penerimaan || []) {
  const header = _.find(headers, function(o) { return o.current_id == item.id_header_gula; });
  const pallet = _.find(pallets, function(s) { return s.number == item.no_pallet; });
  const temp = {
    expected_id,
    current_id: item.current_id,
    sugar_header_id: header.expected_id,
    pallet_id: pallet.expected_id,
    pallet_number: pallet.number,
    bag_amount: item.jml_karung,
    brutto: item.berat_bruto,
    weighed_at: item.insert_date,
    pallet_weight: item.brt_pallet,
    netto: item.berat_netto
  };
  detail_arrival.push(temp);
  expected_id++;
}

let data = JSON.stringify(detail_arrival);
fs.writeFileSync('json/sugar_detail.json', data);