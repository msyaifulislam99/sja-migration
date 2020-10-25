'use strict';

const _ = require('lodash');
const data = require('./json/sugar_detail.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/sugar_detail_query.txt`);
for (const item of data || []) {
  file.write(
    `insert into sugar_details (sugar_header_id,pallet_id,pallet_number,bag_amount,brutto,weighed_at,pallet_weight,netto) values (${item.sugar_header_id},${item.pallet_id},'${item.pallet_number}',${item.bag_amount},${item.brutto},'${item.weighed_at}',${item.pallet_weight},${item.netto}); \n`
  );
}