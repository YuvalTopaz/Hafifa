import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/database";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();