/** YYYY-MM-DD in the given IANA timezone (default Moscow). */
export function getTodayDateId(timeZone = 'Europe/Moscow'): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date());
}
