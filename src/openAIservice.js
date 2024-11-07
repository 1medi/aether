import axios from 'axios';
import { OPENAI_API_KEY } from '@env';


const openAI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  },
});

export const generateText = async (prompt) => {
  try {
    const response = await openAI.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, 
        { role: 'user', content: prompt }  
      ],
      max_tokens: 150,
    });
    return response.data.choices[0].message.content.trim();  
  } catch (error) {
    console.error('Error generating text:', error.response ? error.response.data : error.message);
    throw new Error('Failed to generate text');
  }
};
