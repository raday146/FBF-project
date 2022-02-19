import { createConnection, getRepository } from "typeorm";
import { Product } from "../entity/product.entity";
import { randomInt } from "crypto";
import { lorem, image } from "faker";
createConnection().then(async () => {
  const repo = getRepository(Product);
  for (let i = 0; i < 10; i++) {
    await repo.save({
      title: lorem.words(2),
      desriiption: lorem.words(10),
      email: image.imageUrl(200, 200, "", true),
      price: randomInt(10, 100),
    });
  }
  process.exit();
});
