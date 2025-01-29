import { Day } from "@/types/db/day";
import { onOptionPress, OptionPressInput } from "./MenstruationItem.functions";

const mockCurrentCycle = { id: 10, startDate: "2024-11-11", isEven: 1 };
jest.mock("@/functions/db/getCurrentCycle", () => ({
  getCurrentCycle: () => mockCurrentCycle
}));

const mockStartNewCycle = jest.fn();
jest.mock("@/functions/db/startNewCycle", () => ({
  startNewCycle: (input: any) => mockStartNewCycle(input)
}));

const mockFindLastCyclesReturn = [{ id: 9 }, { id: 7 }, { id: 5 }]
const mockFindLastCycles = jest.fn().mockReturnValue(mockFindLastCyclesReturn);
jest.mock("@/functions/db/findLastCycles", () => ({
  findLastCycles: (input: any) => mockFindLastCycles(input)
}));

const mockPotentialDayIds = ["2024-12-16", "2024-12-17", "2024-12-18"];
const mockFindPotentialDays = jest.fn().mockReturnValue(mockPotentialDayIds);
jest.mock("@/functions/potential/findPotentialDays", () => ({
  findPotentialDays: (input: any) => mockFindPotentialDays(input)
}));

const mockInsertPotentialDays = jest.fn();
jest.mock("@/functions/db/insertPotentialDays", () => ({
  insertPotentialDays: (input: any) => mockInsertPotentialDays(input)
}));

const mockResolveExpectedMenstruation = jest.fn();
jest.mock("@/functions/expectedMenstruation/resolveExpectedMenstruation", () => ({
  resolveExpectedMenstruation: (input: any) => mockResolveExpectedMenstruation(input)
}))

const mockUpdateDay = jest.fn();
jest.mock("@/functions/db/updateDay", () => ({
  updateDay: (input: any) => mockUpdateDay(input)
}));

const mockAlert = jest.fn();
jest.mock("react-native", () => ({
  Alert: { alert: (title, text, buttons) => mockAlert(title, text, buttons) }
}));

let onOptionPressInput: OptionPressInput;
let selectedDayId: string;
describe("MenstruationItem functions test", () => {
  beforeEach(() => {
    selectedDayId = "2024-12-09";
    onOptionPressInput = {
      daysWithData: [{ id: "2024-12-08", menstruationStrength: 1 }],
      db: {} as any,
      item: 1,
      selectedDay: {
        id: selectedDayId,
        cycleId: 10
      },
      dispatch: jest.fn()
    }
    jest.clearAllMocks();
  })

  it("starts new cycle and determines potential days", async () => {
    await onOptionPress({ ...onOptionPressInput, daysWithData: [] });
    const alertButtons = mockAlert.mock.calls[0][2];
    await alertButtons[1].onPress();
    expect(mockStartNewCycle).toHaveBeenCalledTimes(1);
    expect(mockStartNewCycle).toHaveBeenCalledWith(expect.objectContaining({
      selectedDate: selectedDayId
    }));
    expect(mockFindLastCycles).toHaveBeenCalledTimes(1);
    expect(mockFindLastCycles).toHaveBeenCalledWith(expect.objectContaining({ isEven: 0, numberOfCycles: 3 }));
    expect(mockFindPotentialDays).toHaveBeenCalledTimes(1);
    expect(mockFindPotentialDays).toHaveBeenCalledWith(expect.objectContaining({
      currentCycleStartDate: mockCurrentCycle.startDate,
      lastCycles: mockFindLastCyclesReturn
    }));
    expect(mockInsertPotentialDays).toHaveBeenCalledTimes(1);
    expect(mockInsertPotentialDays).toHaveBeenCalledWith(expect.objectContaining({
      dayIds: mockPotentialDayIds,
      cycleId: mockCurrentCycle.id + 1
    }));
    expect(mockResolveExpectedMenstruation).toHaveBeenCalledTimes(1);
    expect(mockResolveExpectedMenstruation).toHaveBeenCalledWith(expect.objectContaining({
      currentCycleStartDate: mockCurrentCycle.startDate,
      lastCycles: mockFindLastCyclesReturn
    }))
  })

  it("recognizes new cycle", async () => {
    await onOptionPress({ ...onOptionPressInput, daysWithData: [{ id: "2024-12-01", menstruationStrength: 1 }] });
    expect(mockAlert).toHaveBeenCalledTimes(1);
  });

  it("tests onOptionPress when unselected value is pressed", async () => {
    await onOptionPress({ ...onOptionPressInput });
    expect(mockAlert).toHaveBeenCalledTimes(0);
    expect(mockUpdateDay).toHaveBeenCalledTimes(1);
    expect(mockUpdateDay).toHaveBeenCalledWith(expect.objectContaining({
      dayProp: "menstruationStrength",
      selectedDate: selectedDayId,
      value: 1
    }));
  })

  it("tests onOptionPress when already selected value is pressed", async () => {
    await onOptionPress({
      ...onOptionPressInput,
      selectedDay: { ...onOptionPressInput.selectedDay, menstruationStrength: 1 }
    });
    expect(mockUpdateDay).toHaveBeenCalledTimes(1);
    expect(mockUpdateDay).toHaveBeenCalledWith(expect.objectContaining({
      dayProp: "menstruationStrength",
      selectedDate: selectedDayId,
      value: 0
    }));
  })
});