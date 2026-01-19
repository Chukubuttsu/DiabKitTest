
import { GoogleGenAI, Type } from "@google/genai";

// Always use named parameter for apiKey and assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFoodImage = async (base64Image: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "Identify this food and provide estimated nutritional values for a standard portion. Focus on accuracy for a diabetic patient.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          foodName: { type: Type.STRING },
          calories: { type: Type.NUMBER, description: "Total kcal" },
          carbohydrates: { type: Type.NUMBER, description: "Grams of carbs" },
          protein: { type: Type.NUMBER, description: "Grams of protein" },
          fat: { type: Type.NUMBER, description: "Grams of fat" },
          sugar: { type: Type.NUMBER, description: "Grams of sugar" },
        },
        required: ["foodName", "calories", "carbohydrates", "protein", "fat", "sugar"],
      },
    },
  });

  try {
    // Accessing the text property directly on the response object.
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
};
