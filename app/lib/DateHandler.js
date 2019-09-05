const zonedTimeToUtc = require('date-fns-tz/zonedTimeToUtc');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const format = require('date-fns-tz/format');

const isDateObject = date => date instanceof Date;

const toDateObject = date => isDateObject(date) ? date : new Date(date);

//utc timezone
const _timeZone = 'Africa/Abidjan';

const currentDateTime = () => 
  new Date(utcToZonedTime(zonedTimeToUtc(new Date, _timeZone), 'Africa/Abidjan'));

const dateTimeForHumans = (date = currentDateTime(), timeZone = _timeZone) =>
  format(toDateObject(date), 'cccc, d MMMM yyyy, HH:mm', {timeZone});

const dateTimeForDB = (date = currentDateTime()) =>
  format(toDateObject(date), 'yyyy/MM/dd HH:mm:ss', { timeZone: 'Africa/Abidjan'}); //Save as utc timezone

const formatDate = (newFormat = 'yyyy/MM/dd HH:mm:ss', date = currentDateTime(), timeZone = 'Africa/Abidjan') =>
  format(toDateObject(date), newFormat, { timeZone });

module.exports = {
  currentDateTime ,
  dateTimeForHumans ,
  dateTimeForDB ,
  formatDate
}