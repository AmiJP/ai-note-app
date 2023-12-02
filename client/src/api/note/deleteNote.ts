import { axiosClient } from "../axiosClient";
import { deleteNoteURL } from "./urls";

export const deleteNote = async (noteId: number) => {
  const deleteURL = deleteNoteURL(noteId);

  const result = await axiosClient.delete(deleteURL.href);
  return result.data;
};
