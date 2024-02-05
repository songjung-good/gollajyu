import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  isLoginModalOpened: false,
  isSignupModalOpened: false,
  isVoteDetailModalOpened: false,
  isVoteSimpleCreateModalOpened: false,
  isVoteProductCreateModalOpened: false,

  // 로그인폼 열립니다 => 하나가 열리면, 다른 모달은 모두 닫힘으로 바뀜
  setLoginModalOpen: () =>
    set(() => ({
      isLoginModalOpened: true,
      isSignupModalOpened: false,
      isVoteDetailModalOpened: false,
      isVoteSimpleCreateModalOpened: false,
      isVoteProductCreateModalOpened: false,
    })),

  // 로그인폼 닫힙니다
  setLoginModalClose: () =>
    set(() => ({
      isLoginModalOpened: false,
    })),

  // 회원가입폼 열립니다
  setSignupModalOpen: () =>
    set(() => ({
      isLoginModalOpened: false,
      isSignupModalOpened: true,
      isVoteDetailModalOpened: false,
      isVoteSimpleCreateModalOpened: false,
      isVoteProductCreateModalOpened: false,
    })),

  // 회원가입폼 닫힙니다
  setSignupModalClose: () =>
    set(() => ({
      isSignupModalOpened: false,
    })),

  // 투표 상세페이지 모달 열립니다
  setVoteDetailModalOpen: () =>
    set(() => ({
      isLoginModalOpened: false,
      isSignupModalOpened: false,
      isVoteDetailModalOpened: true,
      isVoteSimpleCreateModalOpened: false,
      isVoteProductCreateModalOpened: false,
    })),

  // 투표 상세페이지 모달 닫힙니다
  setVoteDetailModalClose: () =>
    set(() => ({
      isVoteDetailModalOpened: false,
    })),

  // 간편투표 생성페이지 모달 열립니다
  setVoteSimpleCreateModalOpen: () =>
    set(() => ({
      isLoginModalOpened: false,
      isSignupModalOpened: false,
      isVoteDetailModalOpened: false,
      isVoteSimpleCreateModalOpened: true,
      isVoteProductCreateModalOpened: false,
    })),

  // 간편투표 생성페이지 모달 닫힙니다
  setVoteSimpleCreateModalClose: () =>
    set(() => ({
      isVoteSimpleCreateModalOpened: false,
    })),

  // 구매투표 생성페이지 모달 열립니다
  setVoteProductCreateModalOpen: () =>
    set(() => ({
      isLoginModalOpened: false,
      isSignupModalOpened: false,
      isVoteDetailModalOpened: false,
      isVoteSimpleCreateModalOpened: false,
      isVoteProductCreateModalOpened: true,
    })),

  // 구매투표 생성페이지 모달 닫힙니다
  setVoteProductCreateModalClose: () =>
    set(() => ({
      isVoteProductCreateModalOpened: false,
    })),
});

const useModalStore = create(
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useModalStore;
