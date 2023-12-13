import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import { AwsClient } from "../../utils/awsClient";

const awsClient = new AwsClient();

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

  let notes = Promise.all(
    result.map(async (note) => {
      let img = await awsClient.getImg(note.image);
      return { ...note, image: img };
    })
  );

  return notes;
}
