import React, { useMemo } from "react";
import { View } from "react-native";
import { Separator } from "@/components/separator/Separator";
import { globalStyles } from "@/styles/globalStyles";
import { resolveRows } from "./List.functions";
import { styles } from "./List.styles";
import { ListProps } from "./List.types";

export const List = ({ columns = 1, items }: ListProps) => {
  const rows = useMemo(() => {
    return resolveRows({ columns, items });
  }, [items]);

  return <View style={globalStyles.container}>
    {rows.map((row, i) => {
      let columnWidthRowSum = 0;
      return (
        <View key={i} style={globalStyles.container} >
          <View style={styles.rowContainer}>
            {row.map((item, j) => {
              columnWidthRowSum = columnWidthRowSum + item.columnWidth;
              return (
                <View
                  key={`${i}${j}`}
                  style={[styles.itemContainer, { width: `${100 / columns * item.columnWidth}%` }]}
                >
                  {item.component}
                  {columnWidthRowSum % columns !== 0 && <Separator orientation="vertical" />}
                </View>
              )
            })}
          </View>
          <Separator />
        </View>
      )
    })}
  </View >
}