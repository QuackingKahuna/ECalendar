export const dateToString = (d: Date) => {
  const month = monthDayFormat(d.getMonth() + 1);
  const day = monthDayFormat(d.getDate());
  return `${d.getFullYear()}-${month}-${day}`;
}

const monthDayFormat = (n: number) => {
  return n < 10 ? `0${n}` : n
}