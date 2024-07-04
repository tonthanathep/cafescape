import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export interface userType {
  id: string;
  provider: {};
  email: string;
  user_profile: {};
}

export interface userStore {
  currentUser: userType;
  setCurrentUser: (userData: userType) => void;
  setCurrentProfile: (profileData: {}) => void;
  logout: () => void;
}

//create zustand store from userStore interface
const useUserStore = create<userStore>((set) => ({
  currentUser: {
    id: "",
    provider: "",
    email: "",
    user_profile: {},
  },
  setCurrentUser: (userData) =>
    set((state) => {
      console.log("userData: ", userData);
      return {
        currentUser: {
          ...state.currentUser,
          id: userData.id,
          provider: userData.app_metadata.provider,
          email: userData.email,
        },
      };
    }),
  setCurrentProfile: (profileData) =>
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        user_profile: profileData,
      },
    })),
  logout: () =>
    set((state) => ({
      currentUser: {
        id: "",
        provider: "",
        email: "",
        user_profile: {},
      },
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("userStore", useUserStore);
}

export default useUserStore;
