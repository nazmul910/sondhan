import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "@/features/doctors/doctorSlice";
import hospitalReducer from "@/features/hospitals/hospitalSlice";
import authReducer from "@/features/auth/authSlice";
import chatReducer from "@/features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    hospitals: hospitalReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
