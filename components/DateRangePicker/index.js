import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import { START_DATE, END_DATE } from 'react-dates/constants'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import { mapProps, compose, withStateHandlers } from 'recompose'

import './style.scss'

moment.locale('en-gb')


// DateRangePicker itself takes and returns moment dates so this compose converts
// it to handle ISO date strings which play better with the immutable redux store
// It also handles the focused input state and prevents the calendar hiding by
// ensuring focusedInput is never null
export default compose(
  mapProps(({ start, end, onChange, isOutsideRange, ...props }) => ({
    startDate: start ? moment(start).startOf('day') : null,
    startDateId: START_DATE, // No idea why this is needed but it is..
    endDate: end ? moment(end).endOf('day') : null,
    endDateId: END_DATE, // Ditto
    keepOpenOnDateSelect: true,
    onDatesChange: ({ startDate, endDate }) => onChange({
      start: startDate && startDate.startOf('day').toISOString(),
      end: endDate && endDate.endOf('day').toISOString(),
    }),
    minimumNights: 0,
    isOutsideRange: () => false,
    ...props,
  })),
  withStateHandlers(
    { focusedInput: START_DATE },
    {
      onFocusChange: ({ focusedInput }) => nextFocus => ({
        focusedInput: nextFocus === null ? focusedInput : nextFocus,
      }),
    },
  ),
)(DateRangePicker)
