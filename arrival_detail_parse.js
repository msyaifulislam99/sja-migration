'use strict';
const tbl_penerimaan = require('./json/tbl_penerimaandet.json');
const pallets = require('./json/pallets.json');
const arrivals = require('./json/arrivals.json');
const _ = require('lodash');
const fs = require('fs');

const detail_arrival = [];
let expected_id = 1;
for (const item of tbl_penerimaan || []) {
  const arrival = _.find(arrivals, function(o) { return o.current_id == item.arrival_id; });
  const pallet = _.find(pallets, function(s) { return s.number == item.pallet_number; });
  const status = (item.status === 1 || item.status === 2) ? 'enter' : 'deleted'
  const temp = {
    current_id: item.current_id,
    current_arrival_id: item.arrival_id,
    arrival_id: arrival.expected_id,
    pallet_id:  pallet.expected_id,
    pallet_number: pallet.number,
    bag_amount: item.bag_amount,
    leave_amount: 0,
    pallet_weight: item.pallet_weight,
    brutto: item.brutto,
    netto: item.netto,
    status
  };
  if (status === 'enter'){
    Object.assign(temp, {expected_id})
  }
  detail_arrival.push(temp);
  if (status === 'enter'){
    expected_id++;
  }
}

let data = JSON.stringify(detail_arrival);
fs.writeFileSync('json/detail_arrivals.json', data);