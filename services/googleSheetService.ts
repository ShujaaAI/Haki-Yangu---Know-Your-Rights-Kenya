import { Lawyer } from '../types';

// This URL should point to your Google Apps Script web app or a similar backend service
// that connects to your Google Sheet. It's stored in an environment variable for security.
const GOOGLE_SHEET_API_URL = process.env.GOOGLE_SHEET_API_URL;

if (!GOOGLE_SHEET_API_URL) {
    // This provides a clear error for developers if the environment variable is missing.
    console.error("CRITICAL: GOOGLE_SHEET_API_URL environment variable is not set.");
}

/**
 * Fetches the list of active/subscribed lawyers from the Google Sheet.
 * The backend service at GOOGLE_SHEET_API_URL should be configured to
 * only return lawyers who have an 'Active' status.
 */
export const fetchLawyers = async (): Promise<Lawyer[]> => {
  try {
    if (!GOOGLE_SHEET_API_URL) {
        throw new Error("Application is not configured to connect to the lawyer database.");
    }
    // A GET request to the endpoint should return all active lawyers.
    const response = await fetch(GOOGLE_SHEET_API_URL);
    if (!response.ok) {
      throw new Error(`Google Sheet API error: ${response.statusText}`);
    }
    // Assuming the API returns a JSON object like { lawyers: [...] }
    const data: { lawyers: Lawyer[] } = await response.json();
    return data.lawyers || [];
  } catch (error) {
    console.error('Failed to fetch lawyers from Google Sheet:', error);
    // Provide a more user-friendly error message
    throw new Error('Could not load the list of lawyers. The database might be temporarily unavailable. Please try again later.');
  }
};

type NewLawyerData = Omit<Lawyer, 'id'>;

/**
 * Adds a new lawyer registration to the Google Sheet.
 * The backend service at GOOGLE_SHEET_API_URL will receive this data
 * and add it to the sheet, typically with a 'Pending' status.
 * @param lawyerData - The lawyer's information from the registration form.
 */
export const addLawyer = async (lawyerData: NewLawyerData): Promise<void> => {
  try {
     if (!GOOGLE_SHEET_API_URL) {
        throw new Error("Application is not configured to accept new lawyer registrations.");
    }
    // A POST request sends the new registration data.
    const response = await fetch(GOOGLE_SHEET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lawyerData),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Google Sheet API submission error:', errorBody);
      throw new Error(`Failed to register. The server responded with: ${response.statusText}`);
    }
    
    // A successful response is enough, no need to return data.
    return;
  } catch (error) {
    console.error('Failed to add lawyer to Google Sheet:', error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unexpected error occurred during registration. Please check your connection.');
  }
};
