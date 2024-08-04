import { numberWithCommas } from "@/(utility)/formatAmount";
import { Card, Text as PaperText, Portal } from "react-native-paper";
import {
  Animated,
  ColorSchemeName,
  Easing,
  StyleSheet,
  View,
} from "react-native";
import { Expenditure } from "@/(utility)/expenditure.interface";
import { deleteRecord } from "@/(utility)/databaseCalls";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useState } from "react";

export default function ExpenditureCard({
  item,
  removeRecord,
  colorSchema,
}: {
  item: Expenditure;
  removeRecord: (s: string) => void;
  colorSchema: ColorSchemeName;
}) {
  const fadeOutAnimationDuration = 1500;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  let timeout: NodeJS.Timeout | null = null;
  const handleExpenditureDelete = (item: Expenditure) => {
    console.log(item);
    console.log("long press log");
    fadeOut();
    timeout = setTimeout(() => {
      setIsDeleting(true);
      deleteRecord(item.id)
        .then(() => {
          console.log("removed");
          removeRecord(item.id);
          setIsDeleting(false);
        })
        .catch((err) => {
          console.log(err);
          setIsDeleting(false);
        });
    }, fadeOutAnimationDuration);
  };

  const fadeAnim = new Animated.Value(1);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.1,
      duration: fadeOutAnimationDuration,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    clearTimeout(timeout!);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {isDeleting ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={MD2Colors.purple500} />
        </View>
      ) : (
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <Card
            style={
              colorSchema === "light"
                ? styles.expenditure
                : styles.expenditureDark
            }
            mode="elevated"
            onLongPress={() => handleExpenditureDelete(item)}
            onPressOut={onPressOut}
          >
            <Card.Content style={styles.expenditureContent}>
              <PaperText variant="bodyMedium">{item.name}</PaperText>
              <PaperText variant="bodyMedium">
                {numberWithCommas(item.amount)} rsd
              </PaperText>
            </Card.Content>
          </Card>
        </Animated.View>
      )}
    </>
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
  expenditureDark: {
    backgroundColor: "#4B0082",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 20,
    width: 350,
  },
  modal: {
    backgroundColor: "red",
    height: 200,
    width: 200,
  },
  expenditureContent: { flexDirection: "row", justifyContent: "space-between" },

  loadingContainer: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 20,
    height: 60,
    borderRadius: 10,
  },
});
