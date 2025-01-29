import { ITEM_HEIGHT } from "@/consts/item";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  background: {
    backgroundColor: "white",
  },
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
    fontSize: 17,
    textAlign: "center"
  },
  rowDirection: {
    flexDirection: "row",
  }
});