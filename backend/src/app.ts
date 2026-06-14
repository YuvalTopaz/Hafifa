import express from "express";
import cors from "cors";
import BookRouter from "./routers/book.router";
import authRouter from "./routers/auth.router";
import employeeRouter from "./routers/employee.router";
import customerRouter from "./routers/customer.router";
import borrowRouter from "./routers/borrow.router";
import "./models";
import authorRouter from "./routers/author.router";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRouter);
app.use("/books", BookRouter);
app.use("/employees", employeeRouter);
app.use("/customers", customerRouter);
app.use("/borrows", borrowRouter);
app.use("/authors", authorRouter);

export default app;