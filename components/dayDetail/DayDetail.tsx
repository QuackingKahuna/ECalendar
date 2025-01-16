import React from "react"
import { View, ScrollView } from "react-native"
import { dayBooleanActionKeys } from "@/types/db/day"
import { BooleanItem } from "./booleanItem/BooleanItem"
import { MenstruationItem } from "./menstruationItem/MenstruationItem"
import { Separator } from "../Separator"
import { globalStyles } from "@/styles/globalStyles"
import { styles } from "./DayDetail.styles"
import { DayDetailTab } from "@/types/dayDetailTab"
import { TemperatureItem } from "./temperatureItem/TemperatureItem"

export const DayDetail = ({ tab }: { tab: DayDetailTab }) => {
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Separator />
        {tab === "menstruation" && (<>
          <MenstruationItem />
          <Separator />
          <TemperatureItem />
        </>)}
        <View style={styles.itemList}>
          {dayBooleanActionKeys.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                <Separator />
                <View style={[globalStyles.container, styles.itemLayout]}>
                  <BooleanItem key={item} type={item} tab={tab} />
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