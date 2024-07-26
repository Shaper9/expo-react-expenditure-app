import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, FlatList, Keyboard } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import {
  Button,
  Text as PaperText,
  ActivityIndicator,
  MD2Colors,
  Icon,
  Portal,
  Modal,
} from "react-native-paper";
import ExpenditureCard from "@/components/ExpenditureCard";
import { Expenditure } from "@/(utility)/expenditure.interface";
import DismissKeyboard from "@/components/DismissKeyboard";
import { createNewRecord, fetchRecords } from "@/(utility)/databaseCalls";
import { indexStyles as styles } from "./index.styles";

export default function TabOneScreen() {
  const snapPoints = useMemo(() => ["25%", "70%", "95%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [nameInput, setNameInput] = useState<string>("");
  const nameInputRef = useRef<any>(null);
  const [amountInput, setAmountInput] = useState<string>("");
  const amountInputRef = useRef<any>(null);
  const [commentInput, setCommentInput] = useState<string | null>(null);
  const commentInputRef = useRef<any>(null);

  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [creatingNewRecord, setCreatingNewRecord] = useState<boolean>(false);

  useEffect(() => {
    setLoadingPage(true);
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
        handleClosePress();
      };
    }, [])
  );

  const handleClosePress = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.close();
  };

  const snapToIndex = (index: number) => {
    setNameInput("");
    setAmountInput("");
    setCommentInput("");
    nameInputRef.current?.clear();
    amountInputRef.current?.clear();
    commentInputRef.current?.clear();

    bottomSheetRef.current?.snapToIndex(index);
  };
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

  const saveForm = () => {
    console.log(nameInput, amountInput, commentInput);
    setCreatingNewRecord(true);

    createNewRecord(nameInput, amountInput, commentInput || "")
      .then((newlyCreatedRecord) => {
        setExpenditures((prev) => [
          newlyCreatedRecord as unknown as Expenditure,
          ...prev,
        ]);
        setCreatingNewRecord(false);
        handleClosePress();
      })
      .catch((err) => {
        console.log(err);
        setCreatingNewRecord(false);
      })
      .finally(() => Keyboard.dismiss());
  };

  const onRemoveRecord = (id: string) => {
    const currentList = [...expenditures];
    const filteredList = currentList.filter((item) => item.id !== id);
    setExpenditures(filteredList);
  };

  const refreshHandler = () => {
    console.log("refresh");
    setRefreshing(true);
    fetchRecords()
      .then((res) => {
        setExpenditures(res as unknown as Expenditure[]);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setRefreshing(false);
      });
  };

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
              renderItem={({ item }) => (
                <ExpenditureCard item={item} removeRecord={onRemoveRecord} />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshHandler}
                />
              }
            />
            <View>
              <View style={styles.newExpenditure}>
                <Button mode="contained" onPress={() => snapToIndex(2)}>
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
                <DismissKeyboard>
                  <Text style={styles.containerHeadline}>
                    New Expenditure 🎉
                  </Text>
                  <View>
                    <Text>Name</Text>
                    <BottomSheetTextInput
                      style={styles.input}
                      maxLength={20}
                      autoCapitalize="sentences"
                      onChangeText={setNameInput}
                      ref={nameInputRef}
                      value={nameInput}
                    />
                  </View>
                  <View>
                    <Text>Amount</Text>
                    <BottomSheetTextInput
                      style={styles.amountInput}
                      keyboardType="numeric"
                      onChangeText={setAmountInput}
                      value={amountInput}
                      ref={amountInputRef}
                    />
                  </View>
                  <View>
                    <Text>Comment</Text>
                    <BottomSheetTextInput
                      style={[styles.input, styles.commentInput]}
                      multiline
                      editable
                      numberOfLines={4}
                      onChangeText={setCommentInput}
                      value={commentInput || ""}
                      ref={commentInputRef}
                    />
                  </View>
                </DismissKeyboard>
                <Button
                  mode="contained"
                  onPress={saveForm}
                  style={{ marginTop: 20 }}
                  loading={creatingNewRecord}
                  disabled={creatingNewRecord}
                >
                  Create
                </Button>
              </View>
            </BottomSheet>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
