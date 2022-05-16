import express from "express";
import userRouter from "./controller/router";

const app = express();
const port = 3001;

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
