import { IPlayer } from "../constants";
import { faker } from "@faker-js/faker";

const generatePlayer = () => {
  const player: IPlayer = {
    avatar: faker.internet.avatar(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    score: Math.round(Math.random() * 1000),
    bio: faker.lorem.sentences(),
  };

  return player;
};

module.exports = generatePlayer;
