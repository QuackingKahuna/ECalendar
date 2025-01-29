import { globalStyles } from "@/styles/globalStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  itemContainer: {
    ...globalStyles.itemContainer,
    flex: 1
  },
  itemTitle: {
    justifyContent: "center",
    alignItems: "center",
    width: 140
  },
});