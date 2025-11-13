import React, { useState } from 'react';
import { addLawyer } from '../services/googleSheetService';

interface RegisterLawyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterLawyerModal: React.FC<RegisterLawyerModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;
  
  const resetForm = () => {
      setName('');
      setPhone('');
      setLocation('');
      setServices('');
      setAgreed(false);
      setError(null);
      setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        setError("You must agree to the subscription terms to register.");
        return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await addLawyer({ name, phone, location, services });
      setSubmitted(true);
      resetForm();
      setTimeout(() => {
        handleClose();
      }, 5000); // Give user time to read the success message
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="register-lawyer-title">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg p-6 relative" onClick={e => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl leading-none" aria-label="Close">&times;</button>
        <h2 id="register-lawyer-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Register as a Lawyer</h2>
        {submitted ? (
          <div className="text-center p-8">
            <i className="fas fa-check-circle text-green-500 text-4xl mb-4"></i>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Registration Submitted!</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Thank you for registering. Your profile is now pending review. You will be contacted via WhatsApp with details on how to complete your subscription to be featured on our list.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
             {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name / Firm Name</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Phone Number (e.g., 254...)</label>
              <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required pattern="254[0-9]{9}" placeholder="254712345678" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location / Direction</label>
              <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="services" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Services Offered (comma-separated)</label>
              <textarea id="services" value={services} onChange={e => setServices(e.target.value)} required rows={3} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreement"
                  name="agreement"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreement" className="font-medium text-gray-700 dark:text-gray-300">
                  I agree to the subscription terms.
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">By checking this box, you agree to be contacted for subscription payment to be listed as a featured lawyer.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting || !agreed} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-opacity">
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterLawyerModal;
