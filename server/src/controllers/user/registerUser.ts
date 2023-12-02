import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const user = new User();

  const userExist = await AppDataSource.manager.findOne(User, {
    where: {
      email: email,
    },
  });

  if (userExist) {
    throw new Error("user already registered");
  }

  const hashpassword = await bcrypt.hash(password, 10);

  user.name = name;
  user.email = email;
  user.password = hashpassword;
  const result = await AppDataSource.manager.save(user);

  return {
    message: "user register successfully",
    data: {
      id: result.id,
      name: result.name,
      email: result.email,
    },
  };
}
