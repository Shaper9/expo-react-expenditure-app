import { numberWithCommas } from "@/(utility)/formatAmount";
import { Card, Text as PaperText } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Expenditure } from "@/(utility)/expenditure.interface";

export default function ExpenditureCard({ item }: { item: Expenditure }) {
  const handleExpenditureDelete = () => {
    console.log("long press log");
  };

  return (
    <Card
      style={styles.expenditure}
      mode="elevated"
      onLongPress={handleExpenditureDelete}
    >
      <Card.Content style={styles.expenditureContent}>
        <PaperText variant="bodyMedium">{item.name}</PaperText>
        <PaperText variant="bodyMedium">
          {numberWithCommas(item.amount)} rsd
        </PaperText>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  expenditure: {
    backgroundColor: "#CBC3E3",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 20,
    width: 350,
  },

  expenditureContent: { flexDirection: "row", justifyContent: "space-between" },
});
