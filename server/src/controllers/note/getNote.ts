import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";

export async function getNote(noteId: number, userId: number) {
  let result = await AppDataSource.manager.findOne(Note, {
    where: {
      id: noteId,
      user: {
        id: userId,
      },
    },
  });

  if (!result) {
    return {
      message: "note not found",
      data: null,
    };
  }

  return result;
}
