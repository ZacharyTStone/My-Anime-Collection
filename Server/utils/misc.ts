import crypto from "crypto";

export const generateRandomNumber = () => crypto.randomInt(100000);
