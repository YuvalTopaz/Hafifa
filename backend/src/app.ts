import express from "express";
import cors from "cors";
import BookRouter from "./routers/book.router";
import authRoutes from "./routers/auth.router";
import employeeRoutes from "./routers/employee.router";
import "./models";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/books", BookRouter);
app.use("/employees", employeeRoutes);

export default app;