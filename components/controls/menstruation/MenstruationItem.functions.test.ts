import { onOptionPress, OptionPressInput } from "./MenstruationItem.functions";

const mockStartNewCycle = jest.fn();
jest.mock("@/functions/db/startNewCycle", () => {
  const originalModule = jest.requireActual("@/functions/db/startNewCycle");
  return {
    ...originalModule,
    startNewCycle: (db, selectedDateId) => mockStartNewCycle(db, selectedDateId)
  }
});

const mockUpdateMenstruationStrength = jest.fn();
jest.mock("@/functions/db/updateMenstruationStrength", () => {
  const originalModule = jest.requireActual("@/functions/db/updateMenstruationStrength");
  return {
    ...originalModule,
    updateMenstruationStrength: (input: any) => mockUpdateMenstruationStrength(input)
  }
});

let onOptionPressInput: OptionPressInput;

describe("MenstruationItem functions test", () => {
  beforeEach(() => {
    onOptionPressInput = {
      item: "+",
      db: {} as any,
      selectedDay: {
        id: "2024-12-09",
        cycleId: 1
      },
      dispatch: jest.fn()
    }
    jest.clearAllMocks();
  })

  it("tests onOptionPress when '+' is pressed", () => {
    onOptionPress(onOptionPressInput)();
    expect(mockStartNewCycle).toHaveBeenCalledTimes(1);
  })

  it("tests onOptionPress when unselected value is pressed", () => {
    onOptionPress({ ...onOptionPressInput, item: "1" })();
    expect(mockUpdateMenstruationStrength).toHaveBeenCalledTimes(1);
    expect(mockUpdateMenstruationStrength).toHaveBeenCalledWith(expect.objectContaining({ strength: 1 }));
  })

  it("tests onOptionPress when already selected value is pressed", () => {
    onOptionPress({
      ...onOptionPressInput,
      item: "1",
      selectedDay: { ...onOptionPressInput.selectedDay, menstruationStrength: 1 }
    })();
    expect(mockUpdateMenstruationStrength).toHaveBeenCalledTimes(1);
    expect(mockUpdateMenstruationStrength).toHaveBeenCalledWith(expect.objectContaining({ strength: 0 }));
  })
});