export type PatientState = {
  status: string;
  error: null | string;
  patients: Patient[];
  formData: {
    name: string;
    age: number;
    gender: string;
    address: string;
    phone: number;
    email: string;
    medicalHistory: string;
    assignedWard: string;
  };
};

export type Patient = {
  name: string;
  age: number;
  gender: string;
  medicalHistory: string;
  phone: number;
  email: string;
  assignedWard: number;
  _id?: string;
};

export type WardState = {
  status: string;
  error: null | string;
  wards: Ward[];
  formData: {
    wardNumber: number;
    capacity: number;
    specializations: string;
  };
};

export type Ward = {
  wardNumber: number;
  capacity: number;
  specializations: string;
  _id?: string;
};
