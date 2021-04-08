'use strict';

const _ = require('lodash');
const data = require('./json/detail_leaves.json');
const detail_arrivals = require('./json/detail_arrivals.json');
const pallets = require('./json/pallets.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/detail_leaves_query.txt`);
// let i = 0;
for (const item of data || []) {
  file.write(
    `insert into detail_leaves (detail_arrival_id,pallet_id,leave_id,pallet_number,bag_amount,brutto,weighed_at,pallet_weight,decrease_weight,netto,status) values (${item.detail_arrival_id},${item.pallet_id},${item.leave_id},'${item.pallet_number}',${item.bag_amount},${item.brutto},'${item.weighed_at}',${item.pallet_weight},${item.decrease_weight},${item.netto}, 'migration'); \n`
  );
  const index_ad = _.findIndex(detail_arrivals, function(o) { return o.expected_id == item.detail_arrival_id; });
  const index_p = _.findIndex(pallets, function(p) { return p.number == item.pallet_number; });

  const current_leave_amount = detail_arrivals[index_ad].leave_amount || 0  
  const leave_amount = current_leave_amount + item.bag_amount;
  
  
  let detail_arrival_status = 'partial';
  let pallet_status = 'being_used';

  if(leave_amount >= detail_arrivals[index_ad].bag_amount) {
    detail_arrival_status = 'leave';
    pallet_status = 'ready';
  }

  detail_arrivals[index_ad].status = detail_arrival_status;
  detail_arrivals[index_ad].leave_amount = leave_amount;
  pallets[index_p].status = pallet_status;
  file.write(
    `UPDATE detail_arrivals SET leave_amount=${leave_amount}, status = '${detail_arrivals[index_ad].status}' WHERE id = ${detail_arrivals[index_ad].expected_id}; \n`
  );
  file.write(
    `UPDATE pallets SET status = '${pallets[index_p].status}' WHERE id = ${pallets[index_p].expected_id}; \n`
  );
  // i++;
  // if (i === 10) { break; }
}