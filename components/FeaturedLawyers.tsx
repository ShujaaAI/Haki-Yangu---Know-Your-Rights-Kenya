import React, { useState, useEffect } from 'react';
import { Lawyer } from '../types';
import { fetchLawyers } from '../services/airtableService';
import RegisterLawyerModal from './RegisterLawyerModal';

const LawyerRow: React.FC<{ lawyer: Lawyer }> = ({ lawyer }) => {
  const handleContact = () => {
    const message = encodeURIComponent(`Hello ${lawyer.name}, I found you on the Kenyan Youth Rights Assistant app and I would like to inquire about your services.`);
    window.open(`https://wa.me/${lawyer.phone}?text=${message}`, '_blank');
  };

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{lawyer.name}</td>
      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{lawyer.location}</td>
      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{lawyer.services}</td>
      <td className="py-3 px-4 text-right">
        <button 
          onClick={handleContact}
          className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors text-xs font-semibold flex items-center"
        >
          <i className="fab fa-whatsapp mr-2"></i>
          My Lawyer
        </button>
      </td>
    </tr>
  );
};

const FeaturedLawyers: React.FC = () => {
    const [lawyers, setLawyers] = useState<Lawyer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    useEffect(() => {
        const loadLawyers = async () => {
            try {
                setIsLoading(true);
                const fetchedLawyers = await fetchLawyers();
                setLawyers(fetchedLawyers);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };
        loadLawyers();
    }, []);

    const handleLawyerAdded = (newLawyer: Lawyer) => {
        // Add the new lawyer to the top of the list for immediate visibility
        setLawyers(prevLawyers => [newLawyer, ...prevLawyers]);
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-10">Loading legal experts...</div>;
        }
        if (error) {
            return <div className="text-center p-10 text-red-500">{error}</div>;
        }
        return (
             <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Direction</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Services Offered</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {lawyers.map(lawyer => <LawyerRow key={lawyer.id} lawyer={lawyer} />)}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Featured Legal Experts</h2>
                <button 
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                    Register as a Lawyer
                </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                This is a list of legal professionals and firms specializing in human rights and constitutional law. You can contact them directly for legal assistance.
            </p>
            {renderContent()}
            <RegisterLawyerModal 
                isOpen={isRegisterModalOpen} 
                onClose={() => setIsRegisterModalOpen(false)}
                onLawyerAdded={handleLawyerAdded}
            />
        </div>
    );
};

export default FeaturedLawyers;