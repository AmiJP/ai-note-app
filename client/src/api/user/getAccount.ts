import { axiosClient } from "../axiosClient";
import { getAccountURL } from "./urls";

export const getAccount = async () => {
  const getUserURL = getAccountURL();
  const result = await axiosClient.get(getUserURL.href);
  return result.data;
};
