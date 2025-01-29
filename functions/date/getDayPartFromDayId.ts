export const getDayPartFromDayId = (dayId: string) => {
  const day = dayId.slice(8);
  return day;
}