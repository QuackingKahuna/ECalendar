import { resolveMarkedDatesStyles } from "./DatePicker.styles";

describe("DatePicker", () => {
  describe("styles", () => {
    it("tests resolveMarkedDateStyles", () => {
      const sut = resolveMarkedDatesStyles({ days: ["2025-01-14", "2025-01-15", "2025-01-16"] });
      expect(sut).toMatchObject({
        ["2025-01-14"]: {
          customStyles: {
            container: {
              backgroundColor: "limegreen",
              width: 60,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0
            }
          }
        },
        ["2025-01-15"]: {
          customStyles: {
            container: {
              backgroundColor: "limegreen",
              width: 60,
              borderRadius: 0
            }
          }
        },
        ["2025-01-16"]: {
          customStyles: {
            container: {
              backgroundColor: "limegreen",
              width: 60,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }
          }
        },
      })
    });
  })
})