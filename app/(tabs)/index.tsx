import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabOneScreen() {
  const snapPoints = useMemo(() => ["25%", "60%", "90%"], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
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

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View>
          <Button title="Open" onPress={handleOpenPress} />
          <Button title="Close" onPress={handleClosePress} />
          <Button title="Collapse" onPress={handleCollapsePress} />
          <Button title="Snap To 0" onPress={() => snapeToIndex(0)} />
          <Button title="Snap To 1" onPress={() => snapeToIndex(1)} />
          <Button title="Snap To 2" onPress={() => snapeToIndex(2)} />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          // handleIndicatorStyle={{ backgroundColor: "g" }}
          // backgroundStyle={{ backgroundColor: "#1d0f4e" }}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.containerHeadline}>
              Awesome Bottom Sheet 🎉
            </Text>
            <Button title="Close" onPress={handleClosePress} />
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    // color: "#fff",
  },
});
