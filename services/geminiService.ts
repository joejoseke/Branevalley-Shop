import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getRecommendations = async (
  userQuery: string,
  products: Product[]
): Promise<number[]> => {
  try {
    const simplifiedProducts = products.map(({ id, name, description, category, price }) => ({
      id,
      name,
      description,
      category,
      price,
    }));

    const prompt = `Based on the following user query, recommend the best products from the list provided.
    
    User Query: "${userQuery}"
    
    Product List: ${JSON.stringify(simplifiedProducts)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert on computer gadgets and accessories. Your task is to recommend products from the provided list based on the user's needs. Respond ONLY with a JSON object containing a 'recommendations' key, which is an array of product IDs that are the best match. The array should not be empty if there are relevant products.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.NUMBER,
                description: "The ID of a recommended product.",
              },
            },
          },
        },
      },
    });

    const jsonResponse = JSON.parse(response.text);
    if (jsonResponse && jsonResponse.recommendations) {
      return jsonResponse.recommendations;
    }

    return [];
  } catch (error) {
    console.error("Error getting recommendations from Gemini:", error);
    // You might want to throw the error or handle it gracefully
    return [];
  }
};
