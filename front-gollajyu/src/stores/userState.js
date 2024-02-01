import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = persist(
  (set) => ({
    isLoggedIn: false,
    setLoggedIn: (data) => set(() => ({ isLoggedIn: true, user: data })),
    setLoggedOut: () => set(() => ({ isLoggedIn: false, user: {} })),
  }),
  {
    name: "userStorage",
  }
);

const useAuthStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useAuthStore;
