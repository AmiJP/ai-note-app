import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import { OpenAiClient } from "../../utils/openAiClient";
import { AwsClient } from "../../utils/awsClient";
import { downloadImage } from "../../utils/downloadImage";

const openai = new OpenAiClient();
const awsClient = new AwsClient();

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

  const imageUrl = await openai.imageGenerate({ prompt: title });
  const imgbuffer = await downloadImage(imageUrl);
  const uploads3 = await awsClient.uploadImage(title, imgbuffer);

  await awsClient.deleteImg(updateNote.image);

  updateNote.title = title;
  updateNote.image = uploads3;
  updateNote.note = note;

  let result = await AppDataSource.manager.save(updateNote);

  return {
    message: "update note successfully",
    data: {
      id: result.id,
      title: result.title,
      image: imageUrl,
      note: result.note,
    },
  };
}
