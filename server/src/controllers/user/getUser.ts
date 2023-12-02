import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export async function getUser(userId: number) {
  let user = await AppDataSource.manager.findOne(User, {
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("user not found");
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
