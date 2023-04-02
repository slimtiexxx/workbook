import classNames from 'classnames'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAllDays } from '@app/reducers/calendarSlice'
import {
  useCreateDayEntryMutation,
  useDayEntriesHoursQuery,
  useLatestBillQuery,
  useUpdateDayEntryMutation,
} from '@generated/graphql'
import { dateUtil, DATE_FORMAT } from '@utils/date'
import { currencyFormatter } from '@utils/currency'

export const CalendarFooter = () => {
  const allHours = useSelector(selectAllDays)
  const { data: latestBillData, loading: latestBillLoading } = useLatestBillQuery()
  const { data: dayEntriesHoursData, refetch: refetchDayEntriesHours } = useDayEntriesHoursQuery({
    skip: !latestBillData,
    variables: {
      from: dateUtil(latestBillData?.bills?.data[0].attributes?.date)
        .add(1, 'day')
        .format(DATE_FORMAT),
      to: dateUtil().format(DATE_FORMAT),
    },
  })
  const [updateDayEntry, { loading: updateDayEntryLoading }] = useUpdateDayEntryMutation({
    onCompleted: () => refetchDayEntriesHours(),
  })
  const [createDayEntry, { loading: createDayEntryLoading }] = useCreateDayEntryMutation({
    onCompleted: () => refetchDayEntriesHours(),
  })

  const unpaidHours = useMemo(() => {
    return dayEntriesHoursData?.dayEntries?.data.reduce((acc, curr) => {
      acc += curr.attributes?.hours || 0

      return acc
    }, 0)
  }, [dayEntriesHoursData])

  const handleSave = async () => {
    await Promise.all(
      allHours.map(async ({ id, date, loggedHours }) => {
        if (id) {
          return updateDayEntry({ variables: { id, hours: loggedHours } })
        }

        return createDayEntry({ variables: { hours: loggedHours, date } })
      }),
    )
  }

  const loading = updateDayEntryLoading || createDayEntryLoading || latestBillLoading

  return (
    <div className='flex items-center justify-between text-stone-300'>
      {unpaidHours && (
        <div>
          Unpaid hours: {unpaidHours}h ({currencyFormatter.format(unpaidHours * 9000)})
        </div>
      )}

      <button
        role='button'
        onClick={handleSave}
        className={classNames(
          'cursor-pointer rounded border border-green-600 opacity-0 py-2 px-8 text-neutral-300 outline-emerald-500 transition hover:bg-green-600',
          {
            'opacity-100': Object.keys(allHours).length > 0,
          },
        )}
      >
        {loading ? 'Saving ...' : 'Save'}
      </button>
    </div>
  )
}
