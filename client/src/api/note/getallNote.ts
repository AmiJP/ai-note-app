import { axiosClient } from "../axiosClient";
import { baseUserURL } from "./urls";

export const getAllNote = async () => {
  const noteURL = baseUserURL();
  const result = await axiosClient.get(noteURL.href);
  return result.data;
};
