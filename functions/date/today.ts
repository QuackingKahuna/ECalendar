import { dateToDayId } from "./dateToDayId";

export const today = () => {
  const today = new Date();
  return dateToDayId(today);
};

export default today;