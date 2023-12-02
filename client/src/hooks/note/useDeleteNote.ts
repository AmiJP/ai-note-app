import { deleteNote } from "@/api/note/deleteNote";
import { Note } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: (result, id) => {
      if (result.success) {
        queryClient.setQueryData(["notes"], (oldNote: Note[]) =>
          oldNote.filter((note) => note.id !== id)
        );
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
