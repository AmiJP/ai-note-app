import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import { AwsClient } from "../../utils/awsClient";

const awsClient = new AwsClient();

export async function removeNote(noteId: number, userId: number) {
  const noteRepository = AppDataSource.getRepository(Note);
  const noteToRemove = await noteRepository.findOneBy({
    id: noteId,
    user: {
      id: userId,
    },
  });

  if (!noteToRemove) {
    return {
      message: "note not found",
      data: null,
    };
  }

  let result = await noteRepository.remove(noteToRemove);

  await awsClient.deleteImg(result.image);

  return {
    message: "note deleted successfully",
    success: true,
  };
}
