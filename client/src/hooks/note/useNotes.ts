import { getAllNote } from "@/api/note/getallNote";
import { useQuery } from "@tanstack/react-query";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getAllNote,
    staleTime: 1000 * 60 * 5,
  });
};
