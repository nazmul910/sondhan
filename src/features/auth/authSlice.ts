import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  fetchProfile,
  updateProfile,
  logoutUser,
} from "./authApi";
import type { AuthState, AuthUser } from "./types";

const TOKEN_KEY = "shondhan_token";

function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=2592000; SameSite=Lax`;
  }
}

function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

// ─── Async Thunks ────────────────────────────────────────────────────────────

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(payload);
      if (response.token) {
        saveToken(response.token);
      }
      return { token: response.token || "", user: response.data };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "লগইন ব্যর্থ হয়েছে");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: { first_name: string; last_name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await registerUser(payload);
      if (response.token) {
        saveToken(response.token);
      }
      return { token: response.token || "", user: response.data };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    }
  }
);

export const loadProfile = createAsyncThunk(
  "auth/loadProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetchProfile(token);
      return response.data;
    } catch (err: unknown) {
      removeToken();
      return rejectWithValue(err instanceof Error ? err.message : "সেশন মেয়াদোত্তীর্ণ হয়েছে");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    payload: {
      first_name: string;
      last_name: string;
      email: string;
      bio?: string | null;
      avatar?: File | null;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;
      if (!token) throw new Error("অনুগ্রহ করে প্রথমে লগইন করুন");
      // Update profile
      await updateProfile(token, payload);
      // Re-fetch fresh profile so avatar URL has valid signed params
      const fresh = await fetchProfile(token);
      return fresh.data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "প্রোফাইল আপডেট ব্যর্থ হয়েছে");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const state = getState() as { auth: AuthState };
    if (state.auth.token) {
      await logoutUser(state.auth.token);
    }
    removeToken();
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  profileLoading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setInitialized(state) {
      state.initialized = true;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.initialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.initialized = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Load Profile
    builder
      .addCase(loadProfile.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(loadProfile.rejected, (state) => {
        state.profileLoading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.initialized = true;
      });

    // Update Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.profileLoading = false;
      state.error = null;
      state.initialized = true;
    });
  },
});

export const { setToken, setUser, setInitialized, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
