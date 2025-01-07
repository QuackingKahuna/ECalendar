import { DATABASE_NAME } from "@/consts/db";
import migrateDbIfNeeded from "@/functions/db/migrateDb";
import { SQLiteProvider } from 'expo-sqlite';
import { Tabs } from "expo-router";
import { setupStore } from "@/redux/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      <Provider store={setupStore()}>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              headerTitle: "Menstruační kalendář",
              title: "Menstruace"
            }} />
          <Tabs.Screen
            name="signsCalendar"
            options={{
              headerTitle: "Přehled příznaků",
              title: "Příznaky"
            }} />
        </Tabs>
      </Provider>
    </SQLiteProvider>);
}
