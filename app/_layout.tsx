import { DATABASE_NAME } from "@/consts/db";
import migrateDbIfNeeded from "@/functions/db/migrateDb";
import { SQLiteProvider } from 'expo-sqlite';
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { setupStore } from "@/redux/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      <Provider store={setupStore()}>
        <PaperProvider>
          <Stack />
        </PaperProvider>
      </Provider>
    </SQLiteProvider>);
}
