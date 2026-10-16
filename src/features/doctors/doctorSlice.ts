import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDoctors, fetchDoctorById } from "./doctorApi";
import type { DoctorsState } from "./types";

// ─── Async Thunks ────────────────────────────────────────────────────────────

export const loadDoctors = createAsyncThunk(
  "doctors/loadDoctors",
  async (
    params: { category_id?: number; search?: string; latitude?: number; longitude?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      return await fetchDoctors(params);
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "অজানা সমস্যা হয়েছে");
    }
  }
);

export const loadDoctorById = createAsyncThunk(
  "doctors/loadDoctorById",
  async ({ id, token }: { id: number | string; token?: string }, { rejectWithValue }) => {
    try {
      return await fetchDoctorById(id, token);
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "ডাক্তারের তথ্য পাওয়া যায়নি");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: DoctorsState = {
  items: [],
  selectedDoctor: null,
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    clearSelectedDoctor(state) {
      state.selectedDoctor = null;
      state.detailError = null;
    },
    clearDoctorError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // loadDoctors
    builder
      .addCase(loadDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // loadDoctorById
    builder
      .addCase(loadDoctorById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(loadDoctorById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedDoctor = action.payload;
      })
      .addCase(loadDoctorById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload as string;
      });
  },
});

export const { clearSelectedDoctor, clearDoctorError } = doctorSlice.actions;
export default doctorSlice.reducer;
