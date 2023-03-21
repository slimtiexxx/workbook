import Excel from 'exceljs'
import path from 'path'
import dayjs from 'dayjs'
import { DayEntry } from '@web/generated/graphql'

const IGNORED_SHEET_NAMES = ['TOTALS - TOTALS', 'Export Summary']
const SOURCE_PATH = path.join(__dirname, './data.xlsx')

const parseExcel = async (): Promise<DayEntry[]> => {
  const workbook = new Excel.Workbook()

  await workbook.xlsx.readFile(SOURCE_PATH)

  const rawData: DayEntry[] = []

  workbook.eachSheet((sheet) => {
    if (IGNORED_SHEET_NAMES.includes(sheet.name)) {
      return false
    }

    sheet.eachRow((row) => {
      const dateObject = dayjs(row.getCell('A').value as string)
      const noteCell = row.getCell('D').value
      const isPaid = (noteCell && typeof noteCell === 'string' && noteCell === 'SZÁMLÁZVA') || false

      if (dateObject.isValid()) {
        rawData.push({
          day: dateObject.format('YYYY-MM-DD'),
          hours: Number(row.getCell('C').value) || 0,
          paid: isPaid,
        })
      }
    })
  })

  return rawData.reduce((acc: DayEntry[], curr: DayEntry) => {
    if (curr.paid) {
      acc = acc.map((day) => ({ ...day, paid: true }))
    }
    acc.push(curr)

    return acc
  }, [])
}
export default parseExcel
