import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialInsight = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: `You are WealthFlow, a sophisticated and elite financial AI advisor. 
        Your tone is professional, concise, reassuring, and elegant. 
        Answer the user's financial question in 2-3 sentences max. 
        Focus on wealth preservation, strategic growth, and market intelligence.
        Do not give specific legal or tax advice, but provide high-level strategic insight.`,
      }
    });

    return response.text || "I apologize, but I am unable to provide an insight at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Unable to connect to the wealth intelligence network.");
  }
};

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are WealthFlow's dedicated AI concierge. 
      Your role is to assist high-net-worth individuals with inquiries about the platform, global market trends, and wealth management strategies.
      Maintain a sophisticated, professional, yet accessible tone.
      Keep responses concise (under 100 words unless detailed analysis is requested).
      If asked about specific stock tips, remind the user you provide strategic intelligence, not financial advice.`,
    }
  });
};