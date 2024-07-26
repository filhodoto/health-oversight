// URL shortcuts
export const ICONS_URL = '/assets/icons';
export const IMAGES_URL = '/assets/images';

const MALE = 'Male';
const FEMALE = 'Female';
const OTHER = 'Other';

export const GENDER_OPTIONS = [MALE, FEMALE, OTHER];

export const PATIENT_FORM_DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'Male' as Gender,
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Birth Certificate',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IDENTIFICATION_TYPES = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'Military ID Card',
  'National Identity Card',
  'Passport',
  'Resident Alien Card (Green Card)',
  'Social Security Card',
  'State ID Card',
  'Student ID Card',
  'Voter ID Card',
];

export const DOCTORS = [
  {
    image: `${IMAGES_URL}/dr-green.png`,
    name: 'John Green',
  },
  {
    image: `${IMAGES_URL}/dr-cameron.png`,
    name: 'Leila Cameron',
  },
  {
    image: `${IMAGES_URL}/dr-livingston.png`,
    name: 'David Livingston',
  },
  {
    image: `${IMAGES_URL}/dr-peter.png`,
    name: 'Evan Peter',
  },
  {
    image: `${IMAGES_URL}/dr-powell.png`,
    name: 'Jane Powell',
  },
  {
    image: `${IMAGES_URL}/dr-remirez.png`,
    name: 'Alex Ramirez',
  },
  {
    image: `${IMAGES_URL}/dr-lee.png`,
    name: 'Jasmine Lee',
  },
  {
    image: `${IMAGES_URL}/dr-cruz.png`,
    name: 'Alyana Cruz',
  },
  {
    image: `${IMAGES_URL}/dr-sharma.png`,
    name: 'Hardik Sharma',
  },
];

export const STATUS_ICON = {
  scheduled: `${ICONS_URL}/check.svg`,
  pending: `${ICONS_URL}/pending.svg`,
  cancelled: `${ICONS_URL}/cancelled.svg`,
};
