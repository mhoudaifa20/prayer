import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is handled securely

const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const modelId = "gemini-2.5-flash-latest"; 
    const systemInstruction = `You are a knowledgeable, polite, and respectful Islamic AI Assistant for the 'Smart Quran Global' app. 
    Your role is to explain Quran verses, Hadith, suggest Duas, and provide educational Islamic answers based on mainstream Sunni sources (Quran and Sahih Sunnah).
    Do not give fatwas (legal rulings) on controversial matters; instead, advise users to consult a local scholar.
    Keep answers concise, spiritual, and uplifting.
    If asked about non-Islamic topics, politely redirect to Islamic wisdom or state your purpose.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I apologize, I could not generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am having trouble connecting to the knowledge base right now. Please try again later.";
  }
};
