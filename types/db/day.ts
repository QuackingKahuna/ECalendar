export type Day = DayBooleanActions & {
  id: string;
  cycleId: number;
  temperature?: string;
  menstruationStrength?: number;
  potential?: number;
};

export const dayBooleanInfo1 = ["sex", "ovarypl", "ovarypr", "hipp", "stomachc", "stomacha", "fatigue", "spinningHead", "fertileMocus", "sensitiveBreasts", "staining", "moodiness", "cravings", "diarrhea"] as const;

export const dayBooleanActionKeys = [...dayBooleanInfo1] as const;
export type DayBooleanActionKeys = typeof dayBooleanActionKeys[number];

export type DayBooleanActions = {
  [key in DayBooleanActionKeys]?: number
};