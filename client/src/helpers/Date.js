/* eslint-disable */
import moment from 'moment'

export default {
  daysBetweenDates (d1, d2) {
    let md1 = moment(d1)
    let md2 = moment(d2)
    return md2.diff(md1, 'days') + 1
  }
}
