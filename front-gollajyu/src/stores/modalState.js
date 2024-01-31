import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  isLoginModalOpened: false,
  isSignupModalOpened: false,
  setLoginModalOpen: () =>
    set(() => ({ isLoginModalOpened: true, isSignupModalOpened: false })),
  setLoginModalClose: () =>
    set(() => ({ isLoginModalOpened: false, isSignupModalOpened: false })),
  setSignupModalOpen: () =>
    set(() => ({ isLoginModalOpened: false, isSignupModalOpened: true })),
  setSignupModalClose: () =>
    set(() => ({ isLoginModalOpened: false, isSignupModalOpened: false })),
});

const useModalStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useModalStore;
