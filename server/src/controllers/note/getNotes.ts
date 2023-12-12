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

  let yaya = Promise.all(
    result.map(async (ele) => {
      let img = await awsClient.getImg(ele.image);
      return { ...ele, image: img };
    })
  );

  console.log(yaya);
  return yaya;
}
