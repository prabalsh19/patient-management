import { configureStore } from "@reduxjs/toolkit";
import { patientSlice } from "./slicies/patient";
import { wardSlice } from "./slicies/ward";
import { hospitalSlice } from "./slicies/hospital";

export const store = configureStore({
  reducer: {
    patient: patientSlice.reducer,
    ward: wardSlice.reducer,
    hospital: hospitalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
