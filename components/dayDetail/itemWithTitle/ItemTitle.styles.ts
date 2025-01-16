import { ITEM_HEIGHT } from "@/consts/item";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    height: ITEM_HEIGHT
  },
  itemTitle: {
    justifyContent: "center",
    alignItems: "center",
    width: 140
  },
});