import { Lawyer } from '../types';

// These should be set in your environment variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
};

// Airtable returns records with fields nested under a 'fields' property.
// These types represent the raw API response structure.
interface AirtableRecord {
  id: string;
  fields: {
    Name: string;
    Phone: string;
    Location: string;
    Services: string;
  };
}

interface AirtableResponse {
  records: AirtableRecord[];
}

const mapAirtableRecordToLawyer = (record: AirtableRecord): Lawyer => {
  return {
    id: record.id,
    name: record.fields.Name,
    phone: record.fields.Phone,
    location: record.fields.Location,
    services: record.fields.Services,
  };
};

export const fetchLawyers = async (): Promise<Lawyer[]> => {
  try {
    const response = await fetch(AIRTABLE_API_URL, { headers });
    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.statusText}`);
    }
    const data: AirtableResponse = await response.json();
    return data.records.map(mapAirtableRecordToLawyer);
  } catch (error) {
    console.error('Failed to fetch lawyers from Airtable:', error);
    throw new Error('Could not load the list of lawyers. Please try again later.');
  }
};

type NewLawyerData = Omit<Lawyer, 'id'>;

export const addLawyer = async (lawyerData: NewLawyerData): Promise<Lawyer> => {
  const payload = {
    fields: {
      Name: lawyerData.name,
      Phone: lawyerData.phone,
      Location: lawyerData.location,
      Services: lawyerData.services,
    },
  };

  try {
    const response = await fetch(AIRTABLE_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Airtable API submission error:', errorBody);
      throw new Error(`Failed to register lawyer. Server responded with: ${response.statusText}`);
    }
    
    const newRecord: AirtableRecord = await response.json();
    return mapAirtableRecordToLawyer(newRecord);
  } catch (error) {
    console.error('Failed to add lawyer to Airtable:', error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unexpected error occurred during registration.');
  }
};
