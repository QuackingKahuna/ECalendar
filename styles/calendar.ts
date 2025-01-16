import { PositionInRange } from "@/types/positionInRange"
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking"

type MarkedDateCustomStyleInput = {
  backgroundColor: string
  textColor?: string
  positionInRange?: PositionInRange
}

export const markedDateCustomStyle = ({ backgroundColor, textColor, positionInRange }: MarkedDateCustomStyleInput) => {
  let res: MarkingProps = {
    customStyles: {
      container: {
        backgroundColor,
      }
    }
  }
  if (positionInRange) {
    res.customStyles!.container!.width = 60;
    if (positionInRange === "start") {
      res.customStyles!.container!.borderTopRightRadius = 0;
      res.customStyles!.container!.borderBottomRightRadius = 0;
    } else if (positionInRange === "middle") {
      res.customStyles!.container!.borderRadius = 0;
    } else if (positionInRange === "end") {
      res.customStyles!.container!.borderTopLeftRadius = 0;
      res.customStyles!.container!.borderBottomLeftRadius = 0;
    }
  }
  if (textColor) {
    res.customStyles!.text = { color: textColor }
  }
  return res;
}