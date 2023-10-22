export const generateRandomNumber = () => Math.floor(Math.random() * 100000);

export const DEMO_USER = {
  name: "Demo",
  isDemo: true,
  email: `DemoUser${generateRandomNumber()}${generateRandomNumber()}${generateRandomNumber()}@demo.com`,
  password: `${generateRandomNumber()}${generateRandomNumber()}${generateRandomNumber()}`,
};
