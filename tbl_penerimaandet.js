'use strict';
const excelToJson = require('convert-excel-to-json');

const fs = require('fs');

const result = excelToJson({
  sourceFile: './excels/tbl_penerimaandet.xlsx',
  columnToKey: {
    A: 'current_id',
    B: 'arrival_id',
    C: 'pallet_number',
    D: 'bag_amount',
    E: 'brutto',
    F: 'netto',
    K: 'status',
    L: 'pallet_weight'
	}
});
// console.log(result);

let i = 1;
for (const item of result.tbl_penerimaan || []) {
  item['expected_id'] = i;
  i++;
}
let data = JSON.stringify(result.tbl_penerimaandet);
fs.writeFileSync('json/tbl_penerimaandet.json', data);