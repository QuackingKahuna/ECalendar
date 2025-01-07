import { DayBooleanActionKeys } from "@/types/db/day";
import { Tab } from "@/types/db/tab";

export type BooleanItemProps = {
  tab: Tab,
  type: DayBooleanActionKeys;
}