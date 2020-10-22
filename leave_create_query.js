'use strict';

const _ = require('lodash');
const data = require('./json/leaves.json');
const fs = require('fs');

const file = fs.createWriteStream(`queries/leaves_query.txt`);
for (const item of data || []) {
  file.write(
    `insert into leaves ('origin','destination', 'license_plate', 'no_surat_jalan', 'ride', 'description', 'user_id', 'leave_at') values ('${item.origin}','${item.destination}','${item.license_plate}','${item.no_surat_jalan}','${item.ride}','${item.description}',${item.user_id}','${item.leave_at}'); \n`
  );
}