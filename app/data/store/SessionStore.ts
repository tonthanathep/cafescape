import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export interface SessionType {
  id: string;
  owner_uuid: string;
  blends_uuid: string;
  created_at: string;
  duration: number;
  status: "ongoing" | "ended";
}

export interface SessionStore {
  currentSession: SessionType;
  setSession: (sessionData: SessionType) => void;
  setSessionBlend: (blends_uuid: string) => void;
  updateDuration: (duration: number) => void;
  endSession: () => void;
}

const useSessionStore = create<SessionStore>((set) => ({
  currentSession: {
    id: "",
    owner_uuid: "",
    blends_uuid: "",
    created_at: "",
    duration: 0,
    status: "ongoing",
  },
  setSession: (sessionData) =>
    set((state) => ({
      currentSession: sessionData,
    })),
  setSessionBlend: (blends_uuid) =>
    set((state) => {
      console.log("update blend: ", blends_uuid);
      return {
        currentSession: {
          ...state.currentSession,
          blends_uuid: blends_uuid,
        },
      };
    }),
  updateDuration: (duration) =>
    set((state) => ({
      currentSession: {
        ...state.currentSession,
        duration: duration,
      },
    })),
  endSession: () =>
    set((state) => ({
      currentSession: { ...state.currentSession, status: "ended" },
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("SessionStore", useSessionStore);
}

export default useSessionStore;
