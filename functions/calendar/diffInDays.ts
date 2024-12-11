export const diffInDays = (date1: string, date2: string) => {
  const a = new Date(date1);
  const b = new Date(date2);
  const diffTime = Math.abs(a.getTime() - b.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}