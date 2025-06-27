
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getSummary = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Summarize the following content:\n\n${text}`,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = { getSummary };
