const Excel = require('exceljs')
const path = require('path')
const dayjs = require('dayjs')
const fs = require('fs')

const IGNORED_SHEET_NAMES = ['TOTALS - TOTALS', 'Export Summary']

const workbook = new Excel.Workbook()

await workbook.xlsx.readFile(path.join(__dirname, '../static/data.xlsx'))

const data = {}

workbook.eachSheet((sheet) => {
  if (IGNORED_SHEET_NAMES.includes(sheet.name)) {
    return false
  }

  sheet.eachRow((row) => {
    const dateObject = dayjs(row.getCell('A').value)

    if (dateObject.isValid()) {
      data[dateObject.format('YYYY-MM-DD')] = row.getCell('C').value || 0
    }
  })
})

fs.writeFile(
  path.join(__dirname, '../src/mocks/logged-hours.json'),
  JSON.stringify(data, null, 2),
  function (err) {
    if (err) throw err
    console.log('complete')
  },
)
