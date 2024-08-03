import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { MD2Colors, MD3Colors, ProgressBar } from "react-native-paper";
import { useSelector } from "react-redux";
import { numberWithCommas } from "@/(utility)/formatAmount";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const totalAmountSpent = useSelector(
    (state: any) => state.appData.totalAmountSpent
  );
  const monthlyIncomeFromState = useSelector(
    (state: any) => state.appData.monthlyIncome
  );
  const [percentageSpent, setPercentageSpent] = useState<number>(0.7);
  const calculatePercentage = (spent: number, salary: number): number => {
    if (salary === 0) return 0;
    console.log(spent / salary);

    return spent / salary;
  };
  useEffect(() => {
    setPercentageSpent(
      calculatePercentage(totalAmountSpent, monthlyIncomeFromState)
    );
  });

  return (
    <View style={styles.container}>
      <Text>Percentage spent this month</Text>
      <ProgressBar
        style={styles.progressBar}
        progress={percentageSpent}
        color={percentageSpent > 0.7 ? MD3Colors.error50 : MD2Colors.green300}
      />
      <View>
        <Text>{numberWithCommas(monthlyIncomeFromState)} din</Text>
        <Text>{numberWithCommas(totalAmountSpent)} din</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  progressBar: {
    height: 50,
    width: 299,
    borderRadius: 15,
  },
});
