import { View } from "react-native";

export const Separator = ({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) => {
  return orientation === "vertical" ? (<View
    style={{
      width: 1,
      height: "100%",
      backgroundColor: "black",
    }}
  />) : (<View
    style={{
      height: 1,
      width: "100%",
      backgroundColor: "black",
    }}
  />);
}