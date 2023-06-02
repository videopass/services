import { sub } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

export class DateHelper {
	static dayInUnix = (date: string | Date = new Date()) => zonedTimeToUtc(date, 'UTC').valueOf()
	static yesterday = (date: Date = new Date()) => zonedTimeToUtc(sub(date, { days: 1 }), 'UTC').valueOf()
}
