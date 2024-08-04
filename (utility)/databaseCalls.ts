import { client } from "@/(database)/pocketbase";

export const createNewRecord = async (
  nameInput: string,
  amountInput: string,
  commentInput: string
) => {
  return await client.collection("expenditures").create({
    name: nameInput,
    amount: Number(amountInput),
    comment: commentInput,
  });
};

export const deleteRecord = async (id: string) => {
  return await client.collection("expenditures").delete(id);
};

export const fetchRecords = async () => {
  return await client
    .collection("expenditures")
    .getFullList({ sort: "-created" });
};

export const deleteAllRecordsFromCollection = async () => {
  try {
    const records = await client.collection("expenditures").getFullList();

    // Delete each record
    for (const record of records) {
      await client.collection("expenditures").delete(record.id);
    }
  } catch (err) {
    console.log(err);
  }
};

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
