import { Note } from "@/types";
import { axiosClient } from "../axiosClient";
import { addNoteURL } from "./urls";

export const addNote = async (note: Partial<Note>) => {
  const noteURL = addNoteURL();
  const result = await axiosClient.post(noteURL.href, note);
  return result.data;
};
