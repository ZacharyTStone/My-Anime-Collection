import { v4 as uuidv4 } from "uuid";

export const generateRandomNumber = () => Math.floor(Math.random() * 100000);

export const DEMO_USER = {
  name: "Demo",
  is_demo_user: true,
  email: `DemoUser${uuidv4()}@demo.com`,
  password: uuidv4(),
};
