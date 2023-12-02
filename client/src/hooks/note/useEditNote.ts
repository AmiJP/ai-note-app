import { updateNote } from "@/api/note/updateNote";
import { Note } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, note }: { noteId: number; note: Partial<Note> }) =>
      updateNote(noteId, note),
    onSuccess: (result, { noteId }) => {
      if (result.data) {
        queryClient.setQueryData(["notes"], (oldNote: Note[]) => {
          return oldNote.map((note) => {
            if (note.id == noteId) {
              return result.data;
            } else {
              return note;
            }
          });
        });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
