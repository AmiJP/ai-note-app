import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import { User } from "../../entity/User";

export async function createNote(
  title: string,
  image: string,
  note: string,
  userId: number | undefined
) {
  let newNote = new Note();
  const user = await AppDataSource.manager.findOne(User, {
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }

  newNote.title = title;
  newNote.image = image;
  newNote.note = note;
  newNote.user = user;

  const result = await AppDataSource.manager.save(newNote);

  return {
    message: "create note successfully",
    data: {
      id: result.id,
      title: result.title,
      image: result.image,
      note: result.note,
    },
  };
}
