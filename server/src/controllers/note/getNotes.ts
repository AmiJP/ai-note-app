import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";

export async function getAllNotes(userId: number) {
  const userRepository = AppDataSource.getRepository(Note);
  const result = await userRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!result) {
    return {
      message: "notes not found",
      data: null,
    };
  }

  return result;
}
