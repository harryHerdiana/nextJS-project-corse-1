
import {connectDatabase,insertDocument} from '../../../helpers/db-utlis'

/* export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "email.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
 */



async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    let client
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
    }

    try {
      await insertDocument(client,'email', {
        email: userEmail,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }

    res.status(201).json({ message: "Signed Up!" });
  }
}
export default handler;
