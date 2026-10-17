import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDoctors,
  fetchDoctorById,
  toggleDoctorWishlist,
  fetchWishlistDoctors,
  rateDoctor,
} from "./doctorApi";
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

export const toggleWishlist = createAsyncThunk(
  "doctors/toggleWishlist",
  async (
    { doctorId, token }: { doctorId: number | string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await toggleDoctorWishlist(doctorId, token);
      return { doctorId: Number(doctorId), is_wishlisted: res.data.is_wishlisted, message: res.message };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "প্রিয় তালিকায় যোগ করা যায়নি");
    }
  }
);

export const loadWishlist = createAsyncThunk(
  "doctors/loadWishlist",
  async (token: string, { rejectWithValue }) => {
    try {
      return await fetchWishlistDoctors(token);
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "প্রিয় তালিকা লোড করা যায়নি");
    }
  }
);

export const submitDoctorRating = createAsyncThunk(
  "doctors/submitRating",
  async (
    {
      doctorId,
      rating,
      token,
    }: { doctorId: number | string; rating: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await rateDoctor(doctorId, rating, token);
      return { doctorId, rating, message: res.message };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "রেটিং জমা দেওয়া যায়নি");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: DoctorsState = {
  items: [],
  wishlistItems: [],
  selectedDoctor: null,
  loading: false,
  detailLoading: false,
  wishlistLoading: false,
  error: null,
  detailError: null,
  rateLoading: false,
  rateSuccess: null,
  rateError: null,
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
    clearRateNotice(state) {
      state.rateSuccess = null;
      state.rateError = null;
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

    // toggleWishlist
    builder.addCase(toggleWishlist.fulfilled, (state, action) => {
      const { doctorId, is_wishlisted } = action.payload;
      if (state.selectedDoctor && state.selectedDoctor.id === doctorId) {
        state.selectedDoctor.is_wishlisted = is_wishlisted;
      }
      if (!is_wishlisted) {
        state.wishlistItems = state.wishlistItems.filter((d) => d.id !== doctorId);
      }
    });

    // loadWishlist
    builder
      .addCase(loadWishlist.pending, (state) => {
        state.wishlistLoading = true;
      })
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.wishlistLoading = false;
        state.wishlistItems = action.payload;
      })
      .addCase(loadWishlist.rejected, (state) => {
        state.wishlistLoading = false;
      });

    // submitDoctorRating
    builder
      .addCase(submitDoctorRating.pending, (state) => {
        state.rateLoading = true;
        state.rateSuccess = null;
        state.rateError = null;
      })
      .addCase(submitDoctorRating.fulfilled, (state, action) => {
        state.rateLoading = false;
        state.rateSuccess = action.payload.message;
        state.rateError = null;
      })
      .addCase(submitDoctorRating.rejected, (state, action) => {
        state.rateLoading = false;
        state.rateError = action.payload as string;
        state.rateSuccess = null;
      });
  },
});

export const { clearSelectedDoctor, clearDoctorError, clearRateNotice } = doctorSlice.actions;
export default doctorSlice.reducer;
