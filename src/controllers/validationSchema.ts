import { collection } from "../database/data";
import hash from "./hashingPassword";
export default async function validation(requestHandler: any) {
  const users = collection("users");
  const name: string = requestHandler.input("userName");
  const email: string = requestHandler.input("email");
  const password: string = requestHandler.input("password");
  const confirmPassword: string = requestHandler.input("confirmPassword");
  const findEmail = await users.findOne({ email: email });
  const validRegex =
    /^[a-zA-Z0-9.!#$%^&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;
  if (!email.match(validRegex)) {
    return "Please enter a valid email";
  } else if (findEmail) {
    return "Email already exists";
  } else if (password !== confirmPassword && password.length > 8) {
    return "Password is incorrect";
  } else {
    const finalPass=await hash(password)
    const data = await users.insertOne({ name, email,password:finalPass});
    return true;
  }
  //
}
