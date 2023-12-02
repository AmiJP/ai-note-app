import { getNote } from "@/api/note/getNote";
import { useQuery } from "@tanstack/react-query";

export const useNote = (noteId: number) => {
  return useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNote(noteId),
    placeholderData: { id: noteId, title: "", note: "" },
  });
};
