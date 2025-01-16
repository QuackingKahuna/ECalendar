import { DayBooleanActionKeys } from "@/types/db/day";
import { DayDetailTab } from "@/types/dayDetailTab";

export type BooleanItemProps = {
  tab: DayDetailTab,
  type: DayBooleanActionKeys;
}