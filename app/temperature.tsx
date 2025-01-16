import { View } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import TemperatureChartPage from "@/components/pages/temperatureChartPage/TemperatureChartPage";

export const Temperature = () => {
  return (
    <View style={globalStyles.container}>
      <TemperatureChartPage />
    </View>
  )
}

export default Temperature;