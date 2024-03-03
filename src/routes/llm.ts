import express from "express";
import { llama7bLLM } from "../controller/llm";

const llmRouter = express.Router();
llmRouter.post("/llama/13b", llama7bLLM);

export { llmRouter };
