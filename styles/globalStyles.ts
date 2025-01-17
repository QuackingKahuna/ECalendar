import { ITEM_HEIGHT } from "@/consts/item";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  itemContainer: {
    flexDirection: "row",
    height: ITEM_HEIGHT
  },
  itemTitleText: {
    fontSize: 18,
    textAlign: "center"
  },
  itemDirection: {
    flexDirection: "row",
  }
});