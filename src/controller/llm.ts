import Replicate from "replicate";
import { Request, Response } from "express";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
const model = "meta/llama-2-7b-chat";
const defaultInput = {
  debug: false,
  top_k: -1,
  top_p: 1,
  prompt: "Tell me history of silicon",
  temperature: 0.75,
  system_prompt:
    "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
  max_new_tokens: 800,
  min_new_tokens: -1,
  repetition_penalty: 1,
};

export async function llama7bLLM(req: Request, res: Response) {
  const input = { ...defaultInput, ...req.body };
  console.log({ model, input });

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  try {
    for await (const event of replicate.stream("meta/llama-2-7b-chat", {
      input,
    })) {
      process.stdout.write(event.toString());
      res.write(event.toString());
    }
    res.end();
  } catch (e: any) {
    res.status(500).send({ title: e.title, detail: e.detail });
  }
}
