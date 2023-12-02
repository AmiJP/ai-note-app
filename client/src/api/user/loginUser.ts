import { axiosClient } from "../axiosClient";
import { loginUserURL } from "./urls";

interface User {
  email: string;
  password: string;
}

export const loginUser = async (user: Partial<User>) => {
  const loginURL = loginUserURL();
  const result = await axiosClient.post(loginURL.href, user);
  return result.data;
};
