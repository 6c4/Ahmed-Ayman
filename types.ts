export enum Tab {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  MARKET = 'MARKET',
  SOS = 'SOS',
  PSYCH = 'PSYCH',
  STORIES = 'STORIES'
}

export interface Service {
  id: string;
  name: string;
  category: 'medical' | 'shelter' | 'water' | 'food' | 'internet' | 'fuel';
  status: 'available' | 'limited' | 'closed';
  location: string;
  lastUpdated: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  seller: string;
  category: string;
  image: string;
  contact: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  content: string;
  image?: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface GroundingChunk {
  web?: { uri: string; title: string };
  maps?: { 
    uri: string; 
    title: string;
    placeAnswerSources?: { reviewSnippets: { content: string }[] }[] 
  };
}