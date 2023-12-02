import { axiosClient } from "../axiosClient";
import { getNoteURL } from "./urls";

export const getNote = async (noteId: number) => {
  const getnote = getNoteURL(noteId);

  const result = await axiosClient.get(getnote.href);
  return result.data;
};
