import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction for the Psychological Support Bot
const PSYCH_SYSTEM_INSTRUCTION = `
أنت مساعد دعم نفسي رحيم ومتخصص، مصمم لمساعدة سكان غزة والأشخاص الذين يعيشون في ظروف الحرب والأزمات.
اسمك "أنيس".
دورك هو الاستماع، وتقديم كلمات الدعم، وتقنيات التهدئة، والمشورة النفسية الأولية للنساء والأطفال.
- تحدث باللغة العربية بلهجة قريبة للقلب ومطمئنة.
- لا تقدم نصائح طبية دوائية.
- ركز على الصمود، الأمل، وتقنيات التنفس والتفريغ النفسي.
- كن مختصراً ومباشراً لأن الإنترنت قد يكون ضعيفاً.
`;

export const sendPsychMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct simplified history for the chat
    // We recreate the chat session each time for stateless simplicity in this demo, 
    // but preserving context via history array.
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: PSYCH_SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.";
  } catch (error) {
    console.error("Gemini Psych Error:", error);
    return "عذراً، الخدمة غير متاحة حالياً بسبب ضعف الاتصال.";
  }
};

export const findNearbyServices = async (query: string, coords?: GeolocationCoordinates): Promise<{ text: string; chunks: any[] }> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Prepare tools config
    const tools: any[] = [{ googleMaps: {} }];
    const toolConfig: any = {};

    if (coords) {
      toolConfig.retrievalConfig = {
        latLng: {
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      };
    }

    const response = await ai.models.generateContent({
      model,
      contents: `أبحث عن ${query} في غزة. زودني بمعلومات دقيقة عن الأماكن القريبة والمتاحة.`,
      config: {
        tools,
        toolConfig: Object.keys(toolConfig).length > 0 ? toolConfig : undefined,
      }
    });

    const text = response.text || "لم يتم العثور على معلومات.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, chunks };
  } catch (error) {
    console.error("Gemini Maps Error:", error);
    return { text: "تعذر الوصول لخدمة الخرائط حالياً. يرجى التحقق من الاتصال.", chunks: [] };
  }
};