import { StyleSheet } from "react-native";
import { ITEM_HEIGHT } from "@/consts/item";

export const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    height: ITEM_HEIGHT
  }
});