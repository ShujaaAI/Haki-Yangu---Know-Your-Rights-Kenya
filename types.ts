
export interface StructuredResponse {
  english: {
    directAnswer: string;
    constitutionalBasis: string;
    whatThisMeans: string;
    whatToDo: string;
    getHelp: string;
  };
  kiswahili: {
    directAnswer: string;
    constitutionalBasis: string;
    whatThisMeans: string;
    whatToDo: string;
    getHelp: string;
  };
}

export interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  content: string | StructuredResponse;
  isLoading?: boolean;
}

export interface KnowledgeCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: string;
}

export interface Lawyer {
  id: number;
  name: string;
  phone: string; // E.g., '254712345678'
  location: string;
  services: string;
}
