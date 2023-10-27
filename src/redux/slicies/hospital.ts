import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPatients: 0,
  occupancyRate: 0,
  averageStay: 0,
  topWard: 0,
};

export const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    updateHospitalStats: (state, action) => {
      state.totalPatients = action.payload.totalPatients;
      state.averageStay = action.payload.averageStay;
      state.occupancyRate = action.payload.occupancyRate;
      state.topWard = action.payload.topWard;
    },
  },
});

export const { updateHospitalStats } = hospitalSlice.actions;
