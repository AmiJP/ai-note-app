import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import { User } from "../../entity/User";
import { AwsClient } from "../../utils/awsClient";
import { downloadImage } from "../../utils/downloadImage";
import { OpenAiClient } from "../../utils/openAiClient";

const openai = new OpenAiClient();
const awsClient = new AwsClient();

export async function createNote(
  title: string,
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

  const imageUrl = await openai.imageGenerate({ prompt: title });
  const imgbuffer = await downloadImage(imageUrl);
  const uploads3 = await awsClient.uploadImage(title, imgbuffer);

  newNote.title = title;
  newNote.image = uploads3;
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
