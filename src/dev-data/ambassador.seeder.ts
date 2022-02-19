import { createConnection, getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import { name, internet } from "faker";
createConnection().then(async () => {
  const repo = getRepository(User);
  const password = await bcryptjs.hash("1234", 10);
  for (let i = 0; i < 10; i++) {
    await repo.save({
      first_name: name.firstName(),
      last_name: name.lastName(),
      email: internet.email(),
      password,
      is_ambassador: true,
    });
  }
  process.exit();
});
