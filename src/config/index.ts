require("dotenv").config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const CONNECTION_STRING = process.env.CONNECTION_STRING;
export const PORT = process.env.PORT || 3000;
export const SECRET_KEY = process.env.SECRET_KEY!;

// export const config = {
//     NODE_ENV: process.env.NODE_ENV || "development",
//     CONNECTION_STRING: process.env.CONNECTION_STRING,
//     PORT: process.env.PORT || 3000,
//     SECRET_KEY: process.env.SECRET_KEY,
// }
