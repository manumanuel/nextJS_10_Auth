import { getServerSession } from "next-auth";
import {} from "../auth/[...nextauth]";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const session = await getServerSession({ req, res, authorize });
  console.log(session);
  if (!session) {
    res.status(401).json({ message: "Un-authorized" });
    return;
  }

  const userEmail = session.user.email;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }
  if (newPassword.trim().length < 7) {
    res
      .status(422)
      .json({ message: "Password should be at least 7 characters long" });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db("auth-nxt");
  const userList = await db.collection("users");
  const currentUser = userList.findOne({ email: userEmail });
  if (!currentUser) {
    res.status(422).json({ message: "User not found!" });
    client.close();
    return;
  }
  const isValid = await verifyPassword(currentPassword, currentUser.password);
  if (!isValid) {
    res.status(403).json({ message: "Invalid password!" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(newPassword);
  const result = await userList.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  if (!result) {
    res.status(422).json({ message: "Password update failed!" });
    client.close();
    return;
  }
  client.close();
  res.status(200).json({ message: "Password updated!" });
}
export default handler;
