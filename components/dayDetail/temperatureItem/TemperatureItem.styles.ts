import { globalStyles } from "@/styles/globalStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row"
  },
  input: {
    ...globalStyles.itemTitleText,
    flex: 1
  },
  unitIndent: {
    ...globalStyles.itemTitleText,
    marginRight: 10
  }
});