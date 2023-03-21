import parseExcel from './parse-excel'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { DayEntriesQuery } from '@web/generated/graphql'

const OUTPUT_PATH = path.join(__dirname, '../../src/mocks/logged-hours.json')

const generateMock = async () => {
  const dayEntries = await parseExcel()

  const queryResponse: DayEntriesQuery = {
    dayEntries: {
      data: dayEntries.map((entry, index) => ({
        __typename: 'DayEntryEntity',
        id: index.toString(),
        attributes: {
          __typename: 'DayEntry',
          ...entry,
        },
      })),
    },
  }

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(queryResponse, null, 2), (err) => {
    if (err) throw err
  })
}

generateMock()
  .then(() => {
    console.log(chalk.green(`🏆⏰  Hours are successfully saved in ${OUTPUT_PATH}`))
  })
  .catch((error) => {
    console.log(chalk.red('❌  Something went wrong'))
    throw error
  })
