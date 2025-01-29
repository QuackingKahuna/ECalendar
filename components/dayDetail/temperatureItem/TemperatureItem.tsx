import { Separator } from "@/components/separator/Separator";
import { RootState } from "@/redux/store";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { onSubmit } from "./TemperatureItem.functions";
import { styles } from "./TemperatureItem.styles";
import { ItemWithTitle } from "../itemWithTitle/ItemWithTitle";

export const TemperatureItem = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state: RootState) => state.days);
  const [temperature, setTemperature] = useState<string>(selectedDay.temperature?.toString() ?? "");

  useEffect(() => {
    setTemperature(selectedDay.temperature?.toString() ?? "");
  }, [selectedDay])

  return (
    <ItemWithTitle title="Teplota:">
      <Separator orientation="vertical" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          inputMode="decimal"
          onChange={(e) => {
            setTemperature(e.nativeEvent.text);
          }}
          onSubmitEditing={onSubmit({ db, dispatch, selectedDay, temperature })}
          value={temperature}
        />
        <Text style={styles.unitIndent}>°C</Text>
      </View>
    </ItemWithTitle >
  );
}