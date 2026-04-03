import env from "dotenv";
env.config();
const JWT_USER_PASSWORD = process.env.JWT_SECRET_PASSWORD;

export default {
  JWT_USER_PASSWORD,
};
