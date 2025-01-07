import { Day, DayBooleanActionKeys } from "@/types/db/day";
import { Tab } from "@/types/db/tab";
import { determineSelected, onPress } from "./BooleanItem.functions";

const mockAddSign = jest.fn();
const mockRemoveSign = jest.fn();
jest.mock("@/redux/signSlice", () => {
  const originalModule = jest.requireActual("@/redux/signSlice");
  return {
    ...originalModule,
    addSign: (input: any) => mockAddSign(input),
    removeSign: (input: any) => mockRemoveSign(input),
  }
});

let selectedDay: Day;
let selectedSigns: DayBooleanActionKeys[];
let tab: Tab;
let type: DayBooleanActionKeys;

describe("BooleanItem functions test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe("determineSelected", () => {
    describe("menstruation tab", () => {
      beforeEach(() => {
        tab = "menstruation";
        type = "fatigue";
        selectedSigns = [];
      });

      it("tests positive result", () => {
        const res = determineSelected({ tab, type, selectedDay: { [type]: 1 }, selectedSigns });
        expect(res).toBe(true);
      });

      it("tests negative result", () => {
        const res = determineSelected({ tab, type, selectedDay: { [type]: 0 }, selectedSigns });
        expect(res).toBe(false);
      });
    });

    describe("sign tab", () => {
      beforeEach(() => {
        tab = "signs";
        type = "fatigue";
        selectedDay = {}
      });

      it("tests positive result", () => {
        const res = determineSelected({ tab, type, selectedDay, selectedSigns: [type] });
        expect(res).toBe(true);
      });

      it("tests negative result", () => {
        const res = determineSelected({ tab, type, selectedDay, selectedSigns: [] });
        expect(res).toBe(false);
      });
    })
  });

  describe("onPress", () => {
    describe("sign tab", () => {
      const db: any = null;
      const dispatch = jest.fn();
      beforeEach(() => {
        tab = "signs";
        type = "fatigue";
        selectedDay = {}
      })

      it("calls addSign", async () => {
        const res = await onPress({ db, dispatch, selectedDay, type, tab })(true);
        expect(mockAddSign).toHaveBeenCalledTimes(1);
        expect(mockAddSign).toHaveBeenCalledWith(type);
      })

      it("calls removeSign", async () => {
        const res = await onPress({ db, dispatch, selectedDay, type, tab })(false);
        expect(mockRemoveSign).toHaveBeenCalledTimes(1);
        expect(mockRemoveSign).toHaveBeenCalledWith(type);
      })
    });
  });
});