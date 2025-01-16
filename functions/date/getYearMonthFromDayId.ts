export const getYearMonthFromDayId = (dayId: string) => {
  const month = dayId.slice(0, 7);
  return month
}