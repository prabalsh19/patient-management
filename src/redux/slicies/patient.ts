import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Patient, PatientState } from "../../utils/types";

const initialState: PatientState = {
  status: "idle",
  error: null,
  patients: [],
  formData: {
    name: "",
    age: 0,
    gender: "male",
    address: "",
    phone: 0,
    email: "",
    medicalHistory: "",
    assignedWard: "",
  },
};

export const getPatients = createAsyncThunk("patient/fetch", async () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(baseUrl + "patient");
  return response.data;
});
export const addPatient = createAsyncThunk(
  "ward/add",
  async (formData: Patient) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(baseUrl + "patient", formData);
    return response.data;
  }
);
export const deletePatient = createAsyncThunk(
  "patient/delete",
  async (id: string) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.delete(baseUrl + "patient/" + id);
    return response.data;
  }
);

export const editPatient = createAsyncThunk(
  "patient/edit",
  async ({ id, newUser }: { id: string; newUser: Patient }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.put(baseUrl + "patient/" + id, {
      ...newUser,
    });
    return response.data;
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    handleFormInputChange: (state, action) => {
      //@ts-ignore
      state.formData[action.payload.name] = action.payload.value;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.status = "success";
        state.patients = action.payload.patients;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(deletePatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.status = "success";
        state.patients = state.patients.filter(
          (p) => p._id !== action.payload.patient._id
        );
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(editPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPatient.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.patients.findIndex(
          (p) => p._id === action.payload.patient._id
        );
        state.patients[index] = action.payload.patient;
      })
      .addCase(editPatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(addPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.status = "success";
        state.patients.push(action.payload.patient);
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      });
  },
});

export const { handleFormInputChange, resetForm } = patientSlice.actions;
