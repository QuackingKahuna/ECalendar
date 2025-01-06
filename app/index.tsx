import { View } from "react-native";
import MainPage from "@/components/pages/MainPage";
import { globalStyles } from "@/styles/container";

export default function Index() {

  return (
    <View style={globalStyles.container}>
      <MainPage />
    </View>
  );
}
