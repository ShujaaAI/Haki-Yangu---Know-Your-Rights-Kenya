import React, { useState } from 'react';

interface RegisterLawyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterLawyerModal: React.FC<RegisterLawyerModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend.
    console.log({ name, phone, location, services });
    setSubmitted(true);
    setTimeout(() => {
        onClose();
        setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="register-lawyer-title">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg p-6 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl leading-none" aria-label="Close">&times;</button>
        <h2 id="register-lawyer-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Register as a Lawyer</h2>
        {submitted ? (
          <div className="text-center p-8">
            <i className="fas fa-check-circle text-green-500 text-4xl mb-4"></i>
            <p className="text-lg text-gray-700 dark:text-gray-300">Thank you for registering! Your submission is under review.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name / Firm Name</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Phone Number (e.g., 254...)</label>
              <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required pattern="[0-9]{12}" placeholder="254712345678" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location / Direction</label>
              <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="services" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Services Offered (comma-separated)</label>
              <textarea id="services" value={services} onChange={e => setServices(e.target.value)} required rows={3} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit Registration</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterLawyerModal;
