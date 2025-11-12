import React from 'react';
import { StructuredResponse } from '../types';

interface ResponseRendererProps {
  data: StructuredResponse;
  language: 'english' | 'kiswahili';
}

const Section: React.FC<{ title: string; content: string; icon: string; }> = ({ title, content, icon }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      <i className={`fas ${icon} mr-3 text-blue-500`}></i>
      <span className="text-gray-800 dark:text-gray-200">{title}</span>
    </h3>
    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap pl-8" dangerouslySetInnerHTML={{ __html: content }}></p>
  </div>
);

const ResponseRenderer: React.FC<ResponseRendererProps> = ({ data, language }) => {
  const langData = data[language];
  const isEnglish = language === 'english';

  if (!langData) {
    return <p>Language data not available.</p>;
  }

  const titles = {
    directAnswer: isEnglish ? "Direct Answer" : "Jibu la Moja kwa Moja",
    constitutionalBasis: isEnglish ? "Constitutional Basis" : "Msingi wa Kikatiba",
    whatThisMeans: isEnglish ? "What This Means" : "Maana Yake",
    whatToDo: isEnglish ? "What To Do" : "Cha Kufanya",
    getHelp: isEnglish ? "Get Help" : "Pata Msaada",
  };

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
      <Section title={titles.directAnswer} content={langData.directAnswer} icon="fa-check-circle" />
      <hr className="my-4 border-gray-200 dark:border-gray-700" />
      
      <Section title={titles.constitutionalBasis} content={langData.constitutionalBasis} icon="fa-balance-scale" />
      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <Section title={titles.whatThisMeans} content={langData.whatThisMeans} icon="fa-info-circle" />
      <hr className="my-4 border-gray-200 dark:border-gray-700" />
      
      <Section title={titles.whatToDo} content={langData.whatToDo} icon="fa-tasks" />
      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <Section title={titles.getHelp} content={langData.getHelp} icon="fa-life-ring" />
    </div>
  );
};

export default ResponseRenderer;
