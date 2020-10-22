'use strict';

const _ = require('lodash');
const data = require('./json/detail_arrivals.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/detail_arrivals_query.txt`);
for (const item of data || []) {
  file.write(
    `insert into detail_arrivals ('arrival_id','pallet_id', 'pallet_number', 'bag_amount', 'leave_amount', 'pallet_weight', 'brutto', 'netto', 'status') values (${item.arrival_id},${item.pallet_id},'${item.pallet_number}',${item.bag_amount},${item.leave_amount},${item.pallet_weight},${item.brutto},${item.netto},'${item.status}'); \n`
  );
}