import Excel from 'exceljs'
import path from 'path'
import dayjs from 'dayjs'
import { DayEntry } from '@web/generated/graphql'

const IGNORED_SHEET_NAMES = ['TOTALS - TOTALS', 'Export Summary']
const SOURCE_PATH = path.join(__dirname, './data.xlsx')

const parseExcel = async (): Promise<DayEntry[]> => {
  const workbook = new Excel.Workbook()

  await workbook.xlsx.readFile(SOURCE_PATH)

  const dayEntries: DayEntry[] = []

  workbook.eachSheet((sheet) => {
    if (IGNORED_SHEET_NAMES.includes(sheet.name)) {
      return false
    }

    sheet.eachRow((row) => {
      const dateObject = dayjs(row.getCell('A').value as string)

      if (dateObject.isValid()) {
        dayEntries.push({
          date: dateObject.format('YYYY-MM-DD'),
          hours: Number(row.getCell('C').value) || 0,
        })
      }
    })
  })

  return dayEntries
}
export default parseExcel
