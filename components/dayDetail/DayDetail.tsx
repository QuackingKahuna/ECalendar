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
import { DetailTitle } from "./detailTitle/DetailTitle"

export const DayDetail = ({ tab }: { tab: DayDetailTab }) => {
  return (
    <View style={globalStyles.container}>
      {tab === "menstruation" && <DetailTitle />}
      <Separator />
      <ScrollView>
        {tab === "menstruation" && (<>
          <MenstruationItem />
          <Separator />
          <TemperatureItem />
          <Separator />
        </>)}
        <View style={styles.itemList}>
          {dayBooleanActionKeys.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                <View style={[globalStyles.container, styles.itemLayout]}>
                  <BooleanItem key={item} type={item} tab={tab} />
                  {index % 3 !== 2 && <Separator orientation="vertical" />}
                </View>
                <Separator />
              </View>)
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default DayDetail;