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
    return spent / salary;
  };
  useEffect(() => {
    if (monthlyIncomeFromState) {
      setPercentageSpent(
        calculatePercentage(totalAmountSpent, monthlyIncomeFromState)
      );
    }
  }, [monthlyIncomeFromState]);

  return (
    <View style={styles.container}>
      {monthlyIncomeFromState > 0 ? (
        <>
          <Text>Percentage spent this month</Text>
          <ProgressBar
            style={styles.progressBar}
            progress={percentageSpent}
            color={
              percentageSpent > 0.7 ? MD3Colors.error50 : MD2Colors.green300
            }
          />
        </>
      ) : (
        <Text>Please go to settings and fill up your monthly income</Text>
      )}
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
