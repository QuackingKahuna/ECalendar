import { dateToString } from "./dateToString";

export const today = () => {
  const today = new Date();
  return dateToString(today);
};

export default today;