import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateResponse = async (prompt, history = []) => {
  try {
    // Format chat history
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.sender === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      text,
      action: determineAction(text)
    };
    
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      success: false,
      text: "I'm having trouble connecting to my knowledge base. Please try again later.",
      error: error.message
    };
  }
};

// Helper function to determine actions from responses
function determineAction(text) {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('search for jobs') || lowerText.includes('find jobs')) {
    return 'suggestJobSearch';
  }
  if (lowerText.includes('remote jobs') || lowerText.includes('remote positions')) {
    return 'suggestRemoteJobs';
  }
  return null;
}