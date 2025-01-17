import { ITEM_HEIGHT } from "@/consts/item";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  itemList: {
    flexWrap: "wrap",
    flexDirection: "row"
  },
  item: {
    width: "33.33%",
    height: ITEM_HEIGHT
  },
  itemLayout: {
    flexDirection: "row"
  }
});