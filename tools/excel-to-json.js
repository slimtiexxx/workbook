const Excel = require('exceljs')
const path = require('path')
const dayjs = require('dayjs')

const IGNORED_SHEET_NAMES = ['TOTALS - TOTALS', 'Export Summary']

const getCellByName = (worksheet, name) => {
  let match
  worksheet.eachRow((row) =>
    row.eachCell((cell) => {
      if (cell.value === name) {
        match = cell
      }
    }),
  )
  return !!match
}

const formatter = new Intl.NumberFormat('hu-HU', {
  style: 'currency',
  currency: 'HUF',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

;(async () => {
  const workbook = new Excel.Workbook()

  await workbook.xlsx.readFile(path.join(__dirname, '../static/data.xlsx'))

  const data = []

  workbook.eachSheet((sheet) => {
    if (IGNORED_SHEET_NAMES.includes(sheet.name)) {
      return false
    }

    const [year, month] = sheet.name.split(' -')[0].split('_')
    const date = dayjs()
      .year(Number(year) + 2000)
      .month(Number(month) - 1)
      .format('YYYY-MMMM')
    const cell = sheet.getRow(4).getCell('F')
    data.push({ date, result: cell.value.result || 0, isBilled: getCellByName(sheet, 'SZÁMLÁZVA') })
  })

  const result = data.reduce((summary, { date, result, isBilled }) => {
    if (!isBilled) {
      summary += result
    } else {
      summary = 0
    }

    return summary
  }, 0)

  const billing = {
    notBilledHours: result,
    notBilledAmount: formatter.format(result * 9000),
  }

  const years = data.reduce(
    (acc, curr) => {
      const [year, month] = curr.date.split('-')
      if (!acc.years[year]) {
        acc.years[year] = {
          [month]: curr.result,
        }
      } else {
        acc.years[year] = {
          ...acc.years[year],
          [month]: curr.result,
        }
      }

      return acc
    },
    { years: {} },
  )

  console.log(JSON.stringify({ billing, years }))
})()
