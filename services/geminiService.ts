
import { GoogleGenAI, Type }from "@google/genai";
import { MediaType, ApiResponse, MediaData, ApiError } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set. Using a placeholder which will fail. Please set your API key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || 'MISSING_API_KEY' });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        error: { type: Type.STRING, nullable: true, description: "An error message if the URL is invalid or private." },
        type: { type: Type.STRING, enum: Object.values(MediaType), nullable: true, description: "The type of media." },
        title: { type: Type.STRING, nullable: true, description: "A plausible title or caption for the media." },
        author: { type: Type.STRING, nullable: true, description: "A plausible Instagram username of the author." },
        thumbnailUrl: { type: Type.STRING, nullable: true, description: "A random image URL from https://picsum.photos/800/800" },
        sources: {
            type: Type.ARRAY,
            nullable: true,
            items: {
                type: Type.OBJECT,
                properties: {
                    quality: { type: Type.STRING, description: "Quality label, e.g., 'HD', 'SD', '1080p'." },
                    url: { type: Type.STRING, description: "A mock download URL, e.g., 'https://example.com/download/media.mp4'" },
                },
                required: ["quality", "url"],
            },
        },
    },
};

export const resolveInstagramUrl = async (url: string, type: MediaType): Promise<ApiResponse> => {
  if (!API_KEY) {
      return { error: "This application is not configured with an API Key for the AI service. Please contact the administrator." };
  }
  try {
    const prompt = `
      You are a mock API for an Instagram media downloader. Your task is to generate a realistic but fake JSON response for a given Instagram URL.
      The user has provided the following URL: "${url}" and selected the media type "${type}".

      Rules:
      1. Analyze the URL. If it looks like a plausible public Instagram URL for the selected type, generate a successful response.
      2. If the URL seems invalid, malformed, or for a private account (e.g., contains words like 'private'), generate an error response with a clear message.
      3. For successful responses, create fake but realistic data. The 'author' should be a creative Instagram-style username. The 'title' should be a short, engaging caption.
      4. The 'thumbnailUrl' MUST be a unique URL from picsum.photos, like https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/800/800
      5. The 'sources' array should contain at least one object. For videos (Reel, Story), provide multiple qualities like '1080p' and '720p'. For images (Post, ProfilePicture), provide one 'HD' source.
      6. The output must be a raw JSON object, without any markdown formatting or explanations.
    `;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        }
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText) as ApiResponse;

    if ('error' in data && data.error) {
        return { error: data.error } as ApiError;
    }
    
    if ('type' in data && data.type && data.title && data.author && data.thumbnailUrl && data.sources) {
        return data as MediaData;
    }

    return { error: 'Failed to process the URL. The AI response was incomplete or malformed.' };

  } catch (error) {
    console.error('Error resolving Instagram URL with Gemini:', error);
    let errorMessage = 'An API error occurred while processing your request. The provided URL might be invalid or the service may be temporarily down.';
    if (error instanceof Error && error.message.includes('API key not valid')) {
        errorMessage = 'The API key for the AI service is invalid. Please contact the site administrator.';
    }
    return { error: errorMessage };
  }
};
