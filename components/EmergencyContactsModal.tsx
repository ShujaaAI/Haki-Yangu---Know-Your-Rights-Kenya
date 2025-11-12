import React from 'react';

interface EmergencyContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contacts = [
    { name: "IPOA (Independent Policing Oversight Authority)", phones: ["(020) 490 6000", "+254792532626", "+254773999000", "+254772333000"] },
    { name: "Kenya Human Rights Commission (KHRC)", phones: ["+254202044545", "+254722264497", "+254733629034"] },
    { name: "Law Society of Kenya (LSK)", phones: ["+254799595800"] },
    { name: "Amnesty International Kenya", phones: ["+254204283000"] },
];

const EmergencyContactsModal: React.FC<EmergencyContactsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md p-6 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl leading-none" aria-label="Close">
                    &times;
                </button>
                <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <i className="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                    Emergency Contacts
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">In case of an emergency, you can contact these organizations for help. Tap a number to call.</p>
                <div className="space-y-4">
                    {contacts.map(contact => (
                        <div key={contact.name} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{contact.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {contact.phones.map(phone => (
                                    <a 
                                        key={phone}
                                        href={`tel:${phone.replace(/[()\s-]/g, '')}`}
                                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                    >
                                        <i className="fas fa-phone-alt mr-2"></i>
                                        {phone}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmergencyContactsModal;
