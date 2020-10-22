'use strict';
const excelToJson = require('convert-excel-to-json');

const fs = require('fs');

const result = excelToJson({
  sourceFile: './excels/tbl_pallet.xlsx',
  columnToKey: {
    A: 'current_id',
    B: 'number',
    C: 'weight'
	}
});
console.log(result);

let i = 1;
for (const item of result.tbl_pallet || []) {
  item['expected_id'] = i;
  i++;
}
let data = JSON.stringify(result.tbl_pallet);
fs.writeFileSync('json/pallets.json', data);