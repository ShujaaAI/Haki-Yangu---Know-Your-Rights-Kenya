
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, KnowledgeCategory } from './types';
import { getRightsExplanation } from './services/geminiService';
import ChatMessageComponent from './components/ChatMessage';
import SuggestedQuestion from './components/SuggestedQuestion';
import EmergencyContactsModal from './components/EmergencyContactsModal';
import CategoryInfoModal from './components/CategoryInfoModal';
import KnowledgeCategoryCard from './components/KnowledgeCategoryCard';
import { categories } from './data/categories';
import FeaturedLawyers from './components/FeaturedLawyers';

type ActiveView = 'chat' | 'lawyers';

const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 0,
      sender: 'ai',
      content: "Hello! I'm your Kenyan Youth Rights Assistant. Ask me a question about your constitutional rights, or explore the categories and lawyer directory. How can I help?",
    }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<'english' | 'kiswahili'>('english');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('chat');

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeView === 'chat') {
        scrollToBottom();
    }
  }, [chatHistory, activeView]);

  const handleSuggestedQuestionClick = (question: string) => {
    handleSubmit(null, question);
  };
  
  const handleCategoryClick = (category: KnowledgeCategory) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | null, question?: string) => {
    e?.preventDefault();
    const query = question || userInput;
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: ChatMessage = { id: Date.now(), sender: 'user', content: query };
    const loadingMessage: ChatMessage = { id: Date.now() + 1, sender: 'ai', content: '', isLoading: true };
    
    setChatHistory(prev => [...prev, userMessage, loadingMessage]);
    setUserInput('');

    try {
      const response = await getRightsExplanation(query);
      const aiMessage: ChatMessage = { id: Date.now() + 1, sender: 'ai', content: response };
      setChatHistory(prev => prev.map(msg => msg.id === loadingMessage.id ? aiMessage : msg));
    } catch (error) {
      const errorMessage: ChatMessage = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        content: error instanceof Error ? error.message : "An unknown error occurred." 
      };
      setChatHistory(prev => prev.map(msg => msg.id === loadingMessage.id ? errorMessage : msg));
    } finally {
      setIsLoading(false);
    }
  };
  
  const suggestedQuestions = [
    "What are my rights if police stop me at a protest?",
    "Can police search my phone without a warrant?",
    "Do I need permission to organize a demonstration?"
  ];

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-lg my-0 sm:my-4">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
         <div className="flex justify-between items-center">
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center text-xs md:text-sm w-28 justify-center"
              aria-label="Open emergency contacts"
            >
              <i className="fas fa-exclamation-triangle mr-1 md:mr-2"></i>
              <span>Emergency</span>
            </button>
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Kenyan Youth Rights Assistant</h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Your guide to understanding constitutional rights.</p>
            </div>
            <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg w-28 justify-center">
                <button
                onClick={() => setLanguage('english')}
                className={`px-3 py-1 text-xs md:text-sm font-medium rounded-md transition-colors ${language === 'english' ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow' : 'text-gray-600 dark:text-gray-300'}`}
                aria-pressed={language === 'english'}
                >
                EN
                </button>
                <button
                onClick={() => setLanguage('kiswahili')}
                className={`px-3 py-1 text-xs md:text-sm font-medium rounded-md transition-colors ${language === 'kiswahili' ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow' : 'text-gray-600 dark:text-gray-300'}`}
                aria-pressed={language === 'kiswahili'}
                >
                SW
                </button>
            </div>
        </div>
        <div className="flex justify-center mt-4 border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={() => setActiveView('chat')}
                className={`px-6 py-2 text-sm font-medium transition-colors border-b-2 ${activeView === 'chat' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                aria-pressed={activeView === 'chat'}
            >
                <i className="fas fa-comments mr-2"></i>Chat Assistant
            </button>
            <button
                onClick={() => setActiveView('lawyers')}
                className={`px-6 py-2 text-sm font-medium transition-colors border-b-2 ${activeView === 'lawyers' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                aria-pressed={activeView === 'lawyers'}
            >
                <i className="fas fa-gavel mr-2"></i>Find a Lawyer
            </button>
        </div>
      </header>
      
      {activeView === 'chat' && (
        <>
            <main className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatHistory.length <= 1 && (
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-gray-700/50">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Knowledge Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {categories.map(cat => (
                            <KnowledgeCategoryCard key={cat.id} category={cat} onClick={handleCategoryClick} />
                            ))}
                        </div>
                    </div>
                )}
                {chatHistory.map(message => (
                <ChatMessageComponent key={message.id} message={message} language={language} />
                ))}
                <div ref={chatEndRef} />
            </main>
            <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                {!isLoading && chatHistory.length <= 1 && (
                <div className="flex flex-wrap gap-2 mb-3 justify-center">
                    {suggestedQuestions.map(q => <SuggestedQuestion key={q} question={q} onClick={handleSuggestedQuestionClick} />)}
                </div>
                )}
                <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask a question about your rights..."
                    disabled={isLoading}
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Send message"
                >
                    {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                    <i className="fas fa-paper-plane"></i>
                    )}
                </button>
                </form>
            </footer>
        </>
      )}

      {activeView === 'lawyers' && (
         <main className="flex-1 overflow-y-auto">
            <FeaturedLawyers />
        </main>
      )}

      <EmergencyContactsModal isOpen={isEmergencyModalOpen} onClose={() => setIsEmergencyModalOpen(false)} />
      <CategoryInfoModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} category={selectedCategory} />
    </div>
  );
};

export default App;
