import { StatusBar } from "expo-status-bar";
import { Keyboard, Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Button, Icon, MD2Colors, TextInput } from "react-native-paper";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { setMonthlyIncome, setResetEmitter } from "@/reducers/appDataReducer";
import { numberWithCommas } from "@/(utility)/formatAmount";
import { deleteAllRecordsFromCollection } from "@/(utility)/databaseCalls";

export default function ModalScreen() {
  const inputRef = useRef<any>();
  const [amountInput, setAmountInput] = useState<string>();
  const [isSet, setIsSet] = useState<boolean>(false);
  const [setNewValue, setSetNewValue] = useState<boolean>(false);
  const [showMonthlyAmount, setShowMonthlyAmount] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const monthlyIncomeFromState = useSelector(
    (state: any) => state.appData.monthlyIncome
  );
  const dispatch = useDispatch();
  const saveMonthlyIncome = () => {
    const amount = Number(amountInput);
    dispatch(setMonthlyIncome(amount));
    setAmountInput("");
    inputRef.current?.clear();
    Keyboard.dismiss();
    setIsSet(true);
    setTimeout(() => {
      setIsSet(false);
      setSetNewValue(true);
    }, 5000);
  };

  const deleteWholeCollection = async () => {
    setLoading(true);
    await deleteAllRecordsFromCollection();
    dispatch(setResetEmitter());
    setLoading(false);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your Preferences</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Current: </Text>
            <Text>
              {showMonthlyAmount
                ? `${numberWithCommas(monthlyIncomeFromState)} din `
                : "*******"}
            </Text>
            <TouchableWithoutFeedback
              style={{
                height: 30,
                width: 30,
                borderWidth: 2,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setShowMonthlyAmount((value) => !value)}
            >
              <Icon
                source={showMonthlyAmount ? "eye-off" : "eye"}
                color={MD2Colors.black}
                size={20}
              />
            </TouchableWithoutFeedback>
          </View>
          <TextInput
            label={"Monthly income"}
            style={{ height: 20, width: 200 }}
            keyboardType="numeric"
            ref={inputRef}
            value={amountInput}
            onChangeText={setAmountInput}
          ></TextInput>
          <Button
            mode="contained"
            onPress={saveMonthlyIncome}
            style={{ marginTop: 10 }}
            disabled={isSet}
          >
            {setNewValue
              ? "Set new value"
              : isSet
              ? "Set successfully"
              : "Set amount"}
          </Button>
        </View>
        <Button
          mode="contained"
          onPress={deleteWholeCollection}
          style={{ marginTop: 200, backgroundColor: "red" }}
          loading={loading}
        >
          Reset expenditure list
        </Button>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
