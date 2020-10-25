'use strict';
const excelToJson = require('convert-excel-to-json');

const fs = require('fs');

const result = excelToJson({
  sourceFile: './excels/tbl_gula_grade.xlsx',
  columnToKey: {
    A: 'current_id',
    B: 'grade',
    C: 'description'
	}
});
// console.log(result);

let i = 1;
for (const item of result.tbl_gula_grade || []) {
  item['expected_id'] = i;
  i++;
}
let data = JSON.stringify(result.tbl_gula_grade);
fs.writeFileSync('json/grade.json', data);