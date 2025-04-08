import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function SignHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input - password should be at least 7 characters long",
    });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db("auth-nxt");

  // Check if user exists
  const existUser = await db.collection("users").findOne({ email: email });
  if (existUser) {
    res.status(422).json({ message: "User already exists!" });
    client.close();
    return;
  }
  // Hash password
  const hashedPassword = await hashPassword(password);

  const result = db
    .collection("users")
    .insertOne({ email: email, password: hashedPassword });
  res.status(201).json({
    message: "Created user!",
  });
  //client.close();
}
export default SignHandler;
