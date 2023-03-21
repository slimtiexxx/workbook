import parseExcel from './parse-excel'
import chalk from 'chalk'
import * as dotenv from 'dotenv'
import { DayEntry } from '@web/generated/graphql'
import 'isomorphic-fetch'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '../../.env') })

const createDayEntry = async (entry: DayEntry) => {
  console.log(process.env.REACT_APP_GRAPHQL_URL)
  const response = await fetch(process.env.REACT_APP_GRAPHQL_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        mutation CreateDayEntry($data: DayEntryInput!) {
          createDayEntry(data: $data) {
            data {
              id
            }
          }
        }
      `,
      variables: {
        data: entry,
      },
    }),
  })

  if (response?.ok) {
    console.log(chalk.green(`✅ Successfully created record for ${entry.day}`))
  } else {
    const reason = await response.text()
    console.log(reason)
    console.log(chalk.red(`‼️ Failed created record for ${entry.day}`))
  }
}

const migrate = async () => {
  const dayEntries = await parseExcel()

  await Promise.all(dayEntries.map(createDayEntry))
}

migrate()
  .then(() => {
    console.log(chalk.green(`🖥️ Successfully migrated to strapi db`))
  })
  .catch((error) => {
    console.log(chalk.red('❌  Something went wrong during migration'))
    throw error
  })
