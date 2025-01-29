export const numericIdToDayId = (numericId: number) => {
  const day = numericId % 100;
  const month = numericId % 10000 - day;
  const year = numericId - month - day;
  return `${year}-${month}-${day}`;
}