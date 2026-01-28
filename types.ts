
export enum AppMode {
  REALISTIC = 'Realistic',
  ANIME = 'Anime'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  image?: string;
  isImageGeneration?: boolean;
}

export interface ChatState {
  messages: Message[];
  mode: AppMode;
  isTyping: boolean;
  intimacyLevel: number;
  naughtyMode: boolean;
}

export interface ImageGenerationRequest {
  description: string;
  mode: AppMode;
}
