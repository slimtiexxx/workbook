import Excel from 'exceljs'
const path = require('path')
const dayjs = require('dayjs')
const fs = require('fs')

;(async () => {
  const IGNORED_SHEET_NAMES = ['TOTALS - TOTALS', 'Export Summary']
  const OUTPUT_PATH = path.join(__dirname, '../../src/mocks/logged-hours.json')
  const SOURCE_PATH = path.join(__dirname, './data.xlsx')

  const workbook = new Excel.Workbook()

  await workbook.xlsx.readFile(SOURCE_PATH)

  const data: Record<string, number> = {}

  workbook.eachSheet((sheet) => {
    if (IGNORED_SHEET_NAMES.includes(sheet.name)) {
      return false
    }

    sheet.eachRow((row) => {
      const dateObject = dayjs(row.getCell('A').value)

      if (dateObject.isValid()) {
        data[dateObject.format('YYYY-MM-DD')] = Number(row.getCell('C').value) || 0
      }
    })
  })

  fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2), function (err: Error) {
    if (err) throw err
    console.log(`🏆 Is succesfully saved in ${OUTPUT_PATH}`)
  })
})()
