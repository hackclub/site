export const dt = d => new Date(d).toLocaleDateString()

const year = new Date().getFullYear()
export const tinyDt = d => dt(d).replace(`/${year}`, '').replace(`${year}-`, '')

export const formatAddress = (city, stateCode, country, countryCode) => {
  const firstHalf = city
  const secondHalf = countryCode === 'US' ? stateCode : country

  // Handle case where city or country is null
  const final = [firstHalf, secondHalf].filter(e => e).join(', ')

  // Handle case where an event's location is outside the US and is so long that
  // it overflows the card when rendering. If the total length of the location
  // is over 16 characters and outside the US, then just show the country name.
  if (countryCode !== 'US' && final.length > 16) {
    return country
  } else {
    return final
  }
}

const humanizedMonth = date =>
  date.toLocaleString('en', { month: 'long', timeZone: 'UTC' })

export const humanizedDateRange = (start, end) => {
  let result = ''
  // the substrings make sure that the dates aren't affected by dumb time zone bs
  const startDate = new Date(start.substr(0, 10))
  const endDate = new Date(end.substr(0, 10))
  if (startDate.getUTCMonth() === endDate.getUTCMonth()) {
    if (startDate.getUTCDate() === endDate.getUTCDate()) {
      // Same day and month means we can return the date
      result = `${humanizedMonth(startDate)} ${startDate.getUTCDate()}`
    } else {
      result = `${humanizedMonth(
        startDate
      )} ${startDate.getUTCDate()}–${endDate.getUTCDate()}`
    }
  } else {
    result = `${shortHumanizedMonth(
      startDate
    )} ${startDate.getUTCDate()}–${shortHumanizedMonth(
      endDate
    )} ${endDate.getUTCDate()}`
  }
  if (new Date().getUTCFullYear() !== startDate.getUTCFullYear()) {
    result += `, ${startDate.getUTCFullYear()}`
  }
  return result
}

// based on https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L146
export const timeSince = (
  previous,
  absoluteDuration = false,
  longForm = false,
  current = new Date()
) => {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerWeek = msPerDay * 7
  const msPerMonth = msPerDay * 30 * 2
  const msPerYear = msPerDay * 365

  const elapsed = new Date(current) - new Date(previous)

  let humanizedTime
  if (elapsed < msPerMinute) {
    humanizedTime = '< 1m'
  } else if (elapsed < msPerHour) {
    const now = Math.round(elapsed / msPerMinute)
    humanizedTime = longForm ? `${now} minute${now > 1 ? 's' : ''}` : `${now}m`
  } else if (elapsed < msPerDay) {
    const now = Math.round(elapsed / msPerHour)
    humanizedTime = longForm ? `${now} hour${now > 1 ? 's' : ''}` : `${now}h`
  } else if (elapsed < msPerWeek) {
    const now = Math.round(elapsed / msPerDay)
    humanizedTime = longForm ? `${now} day${now > 1 ? 's' : ''}` : `${now}d`
  } else if (elapsed < msPerMonth) {
    const now = Math.round(elapsed / msPerWeek)
    humanizedTime = longForm ? `${now} week${now > 1 ? 's' : ''}` : `${now}w`
  } else if (elapsed < msPerYear) {
    const now = Math.round(elapsed / msPerMonth)
    humanizedTime = longForm ? `${now} month${now > 1 ? 's' : ''}` : `${now}mo`
  } else {
    const now = Math.round(elapsed / msPerYear)
    humanizedTime = longForm ? `${now} year${now > 1 ? 's' : ''}` : `${now}y`
  }

  if (absoluteDuration) {
    return humanizedTime
  } else {
    return elapsed > 0 ? `${humanizedTime} ago` : `in ${humanizedTime}`
  }
}

// NOTE(@lachlanjc): I know this is bad, I’m trying to get it out the door okay???
export const timeTo = (time, current = new Date(), longForm = true) => {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 64 // getting close to a day
  const msPerYear = msPerDay * 365

  const elapsed = new Date(time) - new Date(current)

  let humanizedTime
  if (elapsed < msPerMinute) {
    humanizedTime = '< 1m'
  } else if (elapsed < msPerHour) {
    const now = Math.round(elapsed / msPerMinute)
    humanizedTime = longForm ? `${now} more minutes` : `${now}m`
  } else if (elapsed < msPerDay) {
    const now = Math.round(elapsed / msPerHour)
    humanizedTime = longForm ? `${now} more hours` : `${now}h`
  } else if (elapsed < msPerYear) {
    const now = Math.round(elapsed / msPerDay)
    humanizedTime = longForm ? `${now} days` : `${now}d`
  } else {
    const now = Math.round(elapsed / msPerYear)
    humanizedTime = longForm ? `${now} years` : `${now}y`
  }

  return humanizedTime
}

function formatChunk(type, date) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  switch (type) {
    case 'dddd':
      return days[date.getDay()]
    case 'ddd':
      return formatChunk('dddd', date).slice(0, 3)
    case 'dd':
      return ('00' + formatChunk('d', date)).slice(-2)
    case 'd':
      return date.getDate()
    case 'mmmm':
      return months[date.getMonth()]
    case 'mmm':
      return formatChunk('mmmm', date).slice(0, 3)
    case 'mm':
      return ('00' + formatChunk('m', date)).slice(-2)
    case 'm':
      return (date.getMonth() + 1).toString()
    case 'yyyy':
      return date.getFullYear().toString()
    case 'yy':
      return formatChunk('yyyy', date).slice(-2)
    default:
      return null
  }
}
export const formatDate = (format, date, divider = ' ') => {
  return format
    .split(divider)
    .map(chunk => formatChunk(chunk, new Date(date)))
    .join(divider)
}

export const normalizeGitHubCommitUrl = url => {
  return url
    .replace('api.', '')
    .replace('/repos', '')
    .replace('commits', 'commit')
}
