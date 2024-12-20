export const diffInDaysString = (date1: string, date2: string) => {
  return diffInDays(new Date(date1), new Date(date2))
}

export const diffInDays = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}