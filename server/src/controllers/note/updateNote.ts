import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";

export async function updateNote(
  title: string,
  image: string,
  note: string,
  noteId: number,
  userId: number | undefined
) {
  const updateNote = await AppDataSource.manager.findOne(Note, {
    where: {
      id: noteId,
      user: {
        id: userId,
      },
    },
  });

  if (!updateNote) {
    throw new Error("note not found");
  }

  updateNote.title = title;
  updateNote.image = image;
  updateNote.note = note;

  let result = await AppDataSource.manager.save(updateNote);

  return {
    message: "update note successfully",
    data: result,
  };
}
