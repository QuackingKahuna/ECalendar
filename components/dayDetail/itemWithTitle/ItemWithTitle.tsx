import { globalStyles } from "@/styles/globalStyles";
import { Text, View } from "react-native";
import { styles } from "./ItemTitle.styles";
import { ItemTitleProps } from "./ItemTitle.types";

export const ItemWithTitle = ({ title, children }: ItemTitleProps) => {
  return (
    <View style={globalStyles.itemContainer}>
      <View style={styles.itemTitle}>
        <Text style={globalStyles.itemTitleText} >{title}</Text>
      </View>
      {children}
    </View>
  )
};