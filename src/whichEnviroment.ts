import dotenv from "dotenv";

const envPath =
  process.env.NODE_ENV === "development" ? ".env.development" : ".env";
dotenv.config({ path: envPath });
