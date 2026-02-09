export const formatRelativeTime = (
  isoDateString: string
): string => {
  if (!isoDateString) return 'Invalid date'

  const date = new Date(isoDateString)
  const now = new Date()
  
  if (isNaN(date.getTime())) return 'Invalid date'

  // Calculate difference
  const diffInMs = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInWeeks = Math.floor(diffInDays / 7)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  const texts = {
   justNow: 'Just now',
   seconds: (n: number) => `${n} second${n !== 1 ? 's' : ''} ago`,
   minutes: (n: number) => `${n} minute${n !== 1 ? 's' : ''} ago`,
   hours: (n: number) => `${n} hour${n !== 1 ? 's' : ''} ago`,
   days: (n: number) => `${n} day${n !== 1 ? 's' : ''} ago`,
   weeks: (n: number) => `${n} week${n !== 1 ? 's' : ''} ago`,
   months: (n: number) => `${n} month${n !== 1 ? 's' : ''} ago`,
   years: (n: number) => `${n} year${n !== 1 ? 's' : ''} ago`,
  }

  if (diffInSeconds < 5) {
    return texts.justNow;
  } else if (diffInSeconds < 60) {
    return texts.seconds(diffInSeconds);
  } else if (diffInMinutes < 60) {
    return texts.minutes(diffInMinutes);
  } else if (diffInHours < 24) {
    return texts.hours(diffInHours);
  } else if (diffInDays < 7) {
    return texts.days(diffInDays);
  } else if (diffInWeeks < 4) {
    return texts.weeks(diffInWeeks);
  } else if (diffInMonths < 12) {
    return texts.months(diffInMonths);
  } else {
    return texts.years(diffInYears);
  }
}