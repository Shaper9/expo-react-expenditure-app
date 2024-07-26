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

export const fetchRecords = async () => {
  return await client
    .collection("expenditures")
    .getFullList({ sort: "-created" });
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
