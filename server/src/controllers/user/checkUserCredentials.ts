import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export async function checkUserCredentials(email: string, password: string) {
  let user = await AppDataSource.manager.findOne(User, {
    where: {
      email: email,
    },
  });

  if (!user) {
    return null;
  }
  let match = await bcrypt.compare(password, user.password);

  if (!match) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
