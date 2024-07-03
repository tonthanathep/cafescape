import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export interface SessionType {
  id: string;
  owner_uuid: string;
  blends_uuid: string;
  created_at: string;
  duration: number;
  status: "ongoing" | "ended" | "rated";
  score: number;
}

export interface SessionStore {
  currentSession: SessionType;
  setSession: (sessionData: SessionType) => void;
  setSessionId: (id: string) => void;
  setSessionBlend: (blends_uuid: string) => void;
  setSessionDuration: (duration: number) => void;
  setSessionStatus: (status: "ended" | "rated") => void;
  rateSession: (score: number) => void;
}

const useSessionStore = create<SessionStore>((set) => ({
  currentSession: {
    id: "",
    owner_uuid: "",
    blends_uuid: "",
    created_at: "",
    duration: 0,
    status: "ongoing",
    score: 0,
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
  setSessionId: (id) =>
    set((state) => ({
      currentSession: {
        ...state.currentSession,
        id: id,
      },
    })),
  setSessionDuration: (duration) =>
    set((state) => ({
      currentSession: {
        ...state.currentSession,
        duration: duration,
      },
    })),
  setSessionStatus: (status) =>
    set((state) => ({
      currentSession: { ...state.currentSession, status: status },
    })),
  rateSession: (score) =>
    set((state) => ({
      currentSession: {
        ...state.currentSession,
        score: score,
        status: "rated",
      },
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("SessionStore", useSessionStore);
}

export default useSessionStore;
