import { Note } from "@/types";
import { axiosClient } from "../axiosClient";
import { updateNoteURL } from "./urls";

export const updateNote = async (noteId: number, note: Partial<Note>) => {
  const noteURL = updateNoteURL(noteId);

  const result = await axiosClient.put(noteURL.href, note);
  return result.data;
};
