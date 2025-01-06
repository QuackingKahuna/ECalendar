import { View, ScrollView } from "react-native"
import { globalStyles } from "@/styles/container"
import { dayBooleanActionKeys } from "@/types/db/day"
import { MenstruationItem } from "./menstruationItem/MenstruationItem"
import { BooleanItem } from "./booleanItem/BooleanItem"
import { Separator } from "../Separator"
import { styles } from "./DayDetail.styles"

export const DayDetail = () => {
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Separator />
        <MenstruationItem />
        <View style={styles.itemList}>
          {dayBooleanActionKeys.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                <Separator />
                <View style={[globalStyles.container, styles.itemLayout]}>
                  <BooleanItem key={item} type={item} />
                  {index % 2 === 0 && <Separator orientation="vertical" />}
                </View>
              </View>)
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default DayDetail;