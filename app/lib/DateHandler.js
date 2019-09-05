const zonedTimeToUtc = require('date-fns-tz/zonedTimeToUtc');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const idLocale = require('date-fns/locale/id');
const format = require('date-fns-tz/format');
const differenceInDays = require('date-fns/differenceInDays');
const differenceInSeconds = require('date-fns/differenceInSeconds');

const isDateObject = date => date instanceof Date;

const toDateObject = date => isDateObject(date) ? date : new Date(date);

const _timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const currentDateTime = () => 
  new Date(utcToZonedTime(zonedTimeToUtc(new Date, _timeZone), 'Africa/Abidjan'));

const dateTimeForHumans = (date = currentDateTime(), timeZone = _timeZone) =>
  format(toDateObject(date), 'cccc, d MMMM yyyy, HH:mm', {locale: idLocale, timeZone});

const dateTimeForDB = (date = currentDateTime()) =>
  format(toDateObject(date), 'yyyy/MM/dd HH:mm:ss', { timeZone: 'Africa/Abidjan'}); //Save as utc timezone

const formatDate = (newFormat = 'yyyy/MM/dd HH:mm:ss', date = currentDateTime(), timeZone = 'Africa/Abidjan', locale = null) =>
  format(toDateObject(date), newFormat, { timeZone, locale });

const diffForHumans = date => {
  const dateCompare = toDateObject(date);
  
  const diff = differenceInDays(
    dateCompare ,
    currentDateTime()
  );

  if (diff > 1) return formatDate('d MMMM yyyy, HH:mm', dateCompare, _timeZone, idLocale);
  else if ( diff > 0) return `Kemarin, ${formatDate('HH:mm', dateCompare,  _timeZone)}`;
  else return formatDate('HH:mm', dateCompare,  _timeZone);
}

const distanceInHours = date => {
  const origin = toDateObject(date);
  const current = currentDateTime();
  const twoDigits = number => ("0" + number).slice(-2);

  const diff = differenceInSeconds(
    origin ,
    current
  );
  if (diff <= 0) {
    return '00:00:00';
  } else {
    let totalSeconds = diff;
    const hours = twoDigits(Math.floor(diff / 3600));
    totalSeconds %= 3600;
    const mins = twoDigits(Math.floor(totalSeconds / 60));
    const seconds = twoDigits(totalSeconds % 60);

    return `${hours}:${mins}:${seconds}`;
  }
}

module.exports = {
  currentDateTime ,
  dateTimeForHumans ,
  diffForHumans ,
  distanceInHours ,
  dateTimeForDB ,
  formatDate
}