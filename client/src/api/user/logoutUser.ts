import { axiosClient } from "../axiosClient";
import { logoutUserURL } from "./urls";

export const logoutUser = async () => {
  const logoutURL = logoutUserURL();
  const result = await axiosClient.post(logoutURL.href);
  return result.data;
};
