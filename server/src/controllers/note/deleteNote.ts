import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";

export async function removeNote(noteId: number, userId: number) {
  const result = await AppDataSource.manager.delete(Note, {
    id: noteId,
    user: {
      id: userId,
    },
  });

  if (!result.affected) {
    return {
      message: "note not found",
      data: null,
    };
  }

  return {
    message: "note deleted successfully",
    success: true,
  };
}
