import { View, ScrollView } from "react-native"
import { dayBooleanActionKeys } from "@/types/db/day"
import { List } from "@/components/list/List"
import { ListItem } from "@/components/list/List.types"
import { Separator } from "@/components/separator/Separator"
import { globalStyles } from "@/styles/globalStyles"
import { BooleanItem } from "./booleanItem/BooleanItem"
import { DetailTitle } from "./detailTitle/DetailTitle"
import { MenstruationItem } from "./menstruationItem/MenstruationItem"
import { TemperatureItem } from "./temperatureItem/TemperatureItem"
import { DayDetailProps } from "./DayDetail.types"

export const DayDetail = ({ tab }: DayDetailProps) => {
  let items: ListItem[] = dayBooleanActionKeys.map(key => ({
    columnWidth: 1,
    component: (<BooleanItem key={key} type={key} tab={tab} />)
  }))
  if (tab === "menstruation") {
    items = [
      ...[<MenstruationItem />, <TemperatureItem />].map(component => (
        { columnWidth: 3, component }
      )),
      ...items
    ]
  }

  return (
    <View style={globalStyles.container}>
      {tab === "menstruation" && <DetailTitle />}
      <Separator color="#000000" addShadow />
      <ScrollView>
        <List columns={3} items={items} />
      </ScrollView>
    </View>
  )
}

export default DayDetail;