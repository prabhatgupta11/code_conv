const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

const codeConverter = async (req, res) => {
  const { code, fromLanguage, toLanguage } = req.body;
  const prompt = `Translate the following code from ${fromLanguage} to ${toLanguage}: \n${code}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const convertedCode = response.data.choices[0].text;
    res.status(200).json({ msg: convertedCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const codeDebugger = async (req, res) => {
  const { code, language } = req.body;
  const prompt = `Debugging the ${language} code\n${code}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const debuggedCode = response.data.choices[0].text;
    res.status(200).json({ msg: debuggedCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  codeConverter,
  codeDebugger,
};
