import { Configuration, OpenAIApi } from "openai";

export const summarise = async (messages: string[]): Promise<string> => {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY as string,
  });
  const api = new OpenAIApi(config);

  const res = await api.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a bot that summarises slack threads, you are given a list of messages and are expected to return a simple paragraph summarising the thread. Your message should start with TLDR;. If you cannot produce a summary, return 'I am sorry, I cannot summarise this thread.'.",
      },
      {
        role: "user",
        content: messages.join("\n"),
      },
    ],
  });

  const data = res.data;

  return data.choices[0].message?.content ?? "no-op";
};
