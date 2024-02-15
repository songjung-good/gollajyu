import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = persist(
  (set) => ({
    isLoggedIn: false,
    user: {},
    setLoggedIn: (data) => set(() => ({ isLoggedIn: true, user: data })),
    setLogout: () => set(() => ({ isLoggedIn: false, user: {} })),
    // 닉네임 변경 시, 포인트 차감 100
    updateNickname: (nickname) =>
      set((state) => ({
        user: {
          ...state.user,
          nickname: nickname,
          point: state.user.point - 100,
        },
      })),
    // 구매 골라쥬, 간단 골라쥬, 지금 골라쥬 생성 시 포인트 차감 10
    createVote: () =>
      set((state) => ({
        user: {
          ...state.user,
          point: state.user.point - 10,
        },
      })),
    // 투표 참여 시, 포인트 획득 2
    doVote: () =>
      set((state) => ({
        user: {
          ...state.user,
          point: state.user.point + 2,
        },
      })),
  }),
  {
    name: "userStorage",
  }
);

const useAuthStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useAuthStore;

// import useAuthStore from "/src/stores/userState";

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
