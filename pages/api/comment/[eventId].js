import {
  connectDatabase,
  insertDocument,
  getAllDocument,
} from "../../../helpers/db-utlis";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input." });
      client.close();
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    try {
      const result = insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "success", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }

  }
  if (req.method === "GET") {
    try {
      const documents = await getAllDocument(client, "comments", { _id: -1 });
      res.status(200).json({
        comments: documents,
      });
    } catch (error) {
      res.status(500).json({ message: "Getting documnent failed" });
    }
  }
  client.close();
}
export default handler;
