import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = persist(
  (set) => ({
    isLoggedIn: false,
    setLoggedIn: (data) => set(() => ({ isLoggedIn: true, user: data })),
    setLogout: () => set(() => ({ isLoggedIn: false, user: {} })),
  }),
  {
    name: "userStorage",
  }
);

const useAuthStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useAuthStore;

// import useAuthStore from "../stores/userState";

// const user = useAuthStore((state) => state.user);

// user.memberId