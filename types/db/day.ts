type twoToNine = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type oneToNine = 1 | twoToNine;
type zeroToNine = 0 | oneToNine;
type YYYY = `20${twoToNine}${zeroToNine}`;
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
type DD = `0${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`
export type DayId = `${YYYY}-${MM}-${DD}`

//TODO: add numeric id representation "2024-01-01" => 20240101 so the records can be easily ordered
export type Day = DayBooleanActions & {
  id: DayId;
  numericId: number;
  cycleId: number;
  temperature?: number;
  menstruationStrength?: number;
  potential?: number;
};

export const dayBooleanInfo = ["sex", "ovarypl", "ovarypr", "hipp", "stomachc", "stomacha", "fatigue", "spinningHead", "fertileMocus", "sensitiveBreasts", "staining", "moodiness", "cravings", "diarrhea"] as const;

export const sexp = "sexp" as const;

export const dayBooleanActionKeys = [...dayBooleanInfo, sexp] as const;
export type DayBooleanActionKeys = typeof dayBooleanActionKeys[number];

export type DayBooleanActions = {
  [key in DayBooleanActionKeys]?: number
};