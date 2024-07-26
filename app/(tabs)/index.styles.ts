import { StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
  input: {
    minWidth: 300,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },

  amountInput: {
    height: 50,
    width: 150,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    padding: 8,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 10,
  },

  commentInput: {
    minHeight: 80,
  },
});
