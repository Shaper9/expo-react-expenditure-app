import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { client } from "../../(database)/pocketbase";
import {
  Button,
  Text as PaperText,
  ActivityIndicator,
  MD2Colors,
  Icon,
} from "react-native-paper";
import ExpenditureCard from "@/components/ExpenditureCard";
import { Expenditure } from "@/(utility)/expenditure.interface";

export default function TabOneScreen() {
  const snapPoints = useMemo(() => ["25%", "60%", "95%"], []);
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const snapeToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  useEffect(() => {
    console.log("useEffect");
    setLoadingPage(true);
    // const fetchRe = async () => {
    //   const data = await fetch(
    //     "https://react-native-todo-m.pockethost.io/api/collections/todos/records"
    //   );
    //   const jsoned = await data.json();
    //   console.log(jsoned);
    //   return jsoned;
    // };
    // fetchRe()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    const fetchRecords = async () => {
      return await client
        .collection("expenditures")
        .getFullList({ sort: "-created" });
    };
    fetchRecords()
      .then((res) => {
        console.log(res);
        setExpenditures(res as unknown as Expenditure[]);
        setLoadingPage(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingPage(false);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetRef.current?.close();
      };
    }, [])
  );

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {loadingPage ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.purple500}
            size={"large"}
          />
        ) : (
          <>
            <FlatList
              data={expenditures}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ExpenditureCard item={item} />}
            />
            <View>
              <View style={styles.newExpenditure}>
                <Button mode="contained" onPress={() => snapeToIndex(1)}>
                  <Icon source="plus" color={MD2Colors.white} size={20} />
                </Button>
              </View>
            </View>

            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              backdropComponent={renderBackdrop}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.containerHeadline}>
                  Awesome Bottom Sheet 🎉
                </Text>
                <Button mode="contained" onPress={handleClosePress}>
                  Close
                </Button>
              </View>
            </BottomSheet>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  newExpenditure: { width: 300, marginTop: 10 },

  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});
