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

// user에 담겨있는 데이터
// {
//     "memberId": 0,
//     "email": "string",
//     "typeId": 0,
//     "nickname": "string",
//     "birthday": {
//       "year": 0,
//       "month": 0,
//       "day": 0
//     },
//     "gender": "string",
//     "point": 0,
//     "profileImgUrl": "string"
// }
