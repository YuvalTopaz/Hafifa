import express from "express";
import cors from "cors";
import BookRouter from "./routers/book.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", BookRouter);

export default app;