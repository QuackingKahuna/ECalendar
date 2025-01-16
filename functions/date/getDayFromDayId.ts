export const getDayFromDayId = (dayId: string) => {
  const day = dayId.slice(8);
  return day;
}