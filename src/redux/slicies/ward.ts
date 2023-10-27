import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Ward, WardState } from "../../utils/types";

const initialState: WardState = {
  status: "idle",
  error: null,
  wards: [],
  formData: {
    wardNumber: 0,
    capacity: 0,
    specializations: "",
  },
};

export const getWards = createAsyncThunk("ward/fetch", async () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(baseUrl + "ward");
  return response.data;
});

export const addWard = createAsyncThunk("ward/add", async (formData) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(baseUrl + "ward", formData);
  return response.data;
});

export const deleteWard = createAsyncThunk(
  "ward/delete",
  async (id: string) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.delete(baseUrl + "ward/" + id);
    return response.data;
  }
);

export const editWard = createAsyncThunk(
  "ward/edit",
  async ({ id, newWard }: { id: string; newWard: Ward }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.put(baseUrl + "ward/" + id, {
      ...newWard,
    });
    return response.data;
  }
);

export const wardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {
    handleFormInputChange: (state, action) => {
      //@ts-ignore
      state.formData[action.payload.name] = action.payload.value;
    },
    resetForm: (state) => {
      state.formData = {
        wardNumber: 0,
        capacity: 0,
        specializations: "",
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getWards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWards.fulfilled, (state, action) => {
        state.status = "success";
        state.wards = action.payload.wards;
      })
      .addCase(getWards.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(deleteWard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWard.fulfilled, (state, action) => {
        state.status = "success";
        state.wards = state.wards.filter(
          (p) => p._id !== action.payload.ward._id
        );
      })
      .addCase(deleteWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(editWard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editWard.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.wards.findIndex(
          (p) => p._id === action.payload.ward._id
        );
        state.wards[index] = action.payload.ward;
      })
      .addCase(editWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(addWard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addWard.fulfilled, (state, action) => {
        state.status = "success";
        state.wards.push(action.payload.ward);
      })
      .addCase(addWard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      });
  },
});

export const { handleFormInputChange, resetForm } = wardSlice.actions;
