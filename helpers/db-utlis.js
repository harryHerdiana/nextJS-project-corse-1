import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect(
      "mongodb+srv://harryHerdiana:5zh6GO54C3YFMKXD@cluster0.eiszg.mongodb.net/events?retryWrites=true&w=majority"
    );
    return client;
  }
  
  export async function insertDocument(client,collection, document) {
    const db = client.db();
    await db.collection(collection).insertOne(document);
  }
  
  export async function getAllDocument(client,collections,sort){
    const db = client.db();
    const documents = await db
      .collection(collections)
      .find()
      .sort(sort)
      .toArray();
    return documents
  }