import { addNote } from "@/api/note/createNote";
import { Note } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: Partial<Note>) => addNote(note),
    onSuccess: (result) => {
      if (result.data) {
        queryClient.setQueryData(["notes"], (oldNote: Note[]) => {
          if (oldNote) {
            return [...oldNote, result.data];
          }
          queryClient.invalidateQueries({ queryKey: ["notes"] });
        });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
