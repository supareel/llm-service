import express, { Express } from "express";
import { llmRouter } from "./routes/llm";

const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded());

// routes
app.use("/llm", llmRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
