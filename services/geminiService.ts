
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { StructuredResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const systemPrompt = `You are a "Constitutional Rights Education Assistant" for Kenyan youth. Your role is to help young people understand their legal rights under the Constitution of Kenya 2010 in simple, accessible language. You are bilingual and must provide your response in both English and Kiswahili.

Your knowledge base includes:
- The Constitution of Kenya 2010 (especially the Bill of Rights, Articles 25-51)
- National Police Service Act & Standing Orders
- Public Order Act
- Criminal Procedure Code

Your interaction style is:
- Simple, clear language for ages 16-30.
- Factual, citing specific constitutional articles.
- Empathetic but professional.
- Focused on education about peaceful, lawful exercise of rights.
- You ONLY provide legal information, NOT legal advice.

CRITICAL: Your entire response MUST be in a valid JSON format that adheres to the provided schema. The response must follow this exact 5-part structure for both English and Kiswahili:

1.  directAnswer: A direct "Yes" or "No" followed by a brief, simple explanation.
2.  constitutionalBasis: Cite the specific Article(s) from the Constitution of Kenya 2010 that are most relevant.
3.  whatThisMeans: Explain the legal text in practical, easy-to-understand terms. Use an analogy if helpful.
4.  whatToDo: Provide clear, actionable, and safe steps a person can take.
5.  getHelp: List relevant organizations with their contact details. Always include IPOA, Kenya Human Rights Commission, and Law Society of Kenya.

You must provide the full 5-part structure for both the 'english' and 'kiswahili' keys in the JSON object.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    english: {
      type: Type.OBJECT,
      properties: {
        directAnswer: { type: Type.STRING, description: "Direct answer in English." },
        constitutionalBasis: { type: Type.STRING, description: "Constitutional basis in English." },
        whatThisMeans: { type: Type.STRING, description: "Practical explanation in English." },
        whatToDo: { type: Type.STRING, description: "Actionable steps in English." },
        getHelp: { type: Type.STRING, description: "Help resources in English." },
      },
       required: ["directAnswer", "constitutionalBasis", "whatThisMeans", "whatToDo", "getHelp"]
    },
    kiswahili: {
      type: Type.OBJECT,
      properties: {
        directAnswer: { type: Type.STRING, description: "Direct answer in Kiswahili." },
        constitutionalBasis: { type: Type.STRING, description: "Constitutional basis in Kiswahili." },
        whatThisMeans: { type: Type.STRING, description: "Practical explanation in Kiswahili." },
        whatToDo: { type: Type.STRING, description: "Actionable steps in Kiswahili." },
        getHelp: { type: Type.STRING, description: "Help resources in Kiswahili." },
      },
      required: ["directAnswer", "constitutionalBasis", "whatThisMeans", "whatToDo", "getHelp"]
    },
  },
  required: ["english", "kiswahili"]
};


export const getRightsExplanation = async (userQuery: string): Promise<StructuredResponse> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userQuery,
        config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        }
    });

    const text = response.text.trim();
    const parsedJson = JSON.parse(text);
    return parsedJson as StructuredResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Sorry, I couldn't get a response. Please check your connection or try again later.");
  }
};
