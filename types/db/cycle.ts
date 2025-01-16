import { DayId } from "./day";

export type Cycle = {
  id: number;
  startDate: DayId;
  endDate?: DayId;
  length?: number;
  isEven: number;
};