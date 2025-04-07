import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://manuelmanu008:6W1jYv7l8tAVFx7r@cluster0.6nblf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}
