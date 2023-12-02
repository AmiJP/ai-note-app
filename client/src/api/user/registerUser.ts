import { axiosClient } from "../axiosClient";
import { registerUserURL } from "./urls";

interface User {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (user: Partial<User>) => {
  const registerURL = registerUserURL();
  const result = await axiosClient.post(registerURL.href, user);
  return result.data;
};
