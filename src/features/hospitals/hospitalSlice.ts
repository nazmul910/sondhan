import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHospitals, fetchHospitalById } from "./hospitalApi";
import type { HospitalsState } from "./types";

// ─── Async Thunks ────────────────────────────────────────────────────────────

export const loadHospitals = createAsyncThunk(
  "hospitals/loadHospitals",
  async (
    params: {
      search?: string;
      latitude?: number;
      longitude?: number;
      per_page?: number;
      page?: number;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      return await fetchHospitals(params);
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "অজানা সমস্যা হয়েছে");
    }
  }
);

export const loadHospitalById = createAsyncThunk(
  "hospitals/loadHospitalById",
  async (id: number | string, { rejectWithValue }) => {
    try {
      return await fetchHospitalById(id);
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "হাসপাতালের তথ্য পাওয়া যায়নি");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: HospitalsState = {
  items: [],
  selectedHospital: null,
  pagination: null,
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
};

const hospitalSlice = createSlice({
  name: "hospitals",
  initialState,
  reducers: {
    clearSelectedHospital(state) {
      state.selectedHospital = null;
      state.detailError = null;
    },
    clearHospitalError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // loadHospitals
    builder
      .addCase(loadHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(loadHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // loadHospitalById
    builder
      .addCase(loadHospitalById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(loadHospitalById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedHospital = action.payload;
      })
      .addCase(loadHospitalById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload as string;
      });
  },
});

export const { clearSelectedHospital, clearHospitalError } = hospitalSlice.actions;
export default hospitalSlice.reducer;
