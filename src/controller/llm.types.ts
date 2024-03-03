export interface ChatLLMParams {
  debug: boolean;
  top_k: number;
  top_p: number;
  prompt: string;
  temperature: number;
  system_prompt: string;
  max_new_tokens: number;
  min_new_tokens: number;
  repetition_penalty: number;
}
