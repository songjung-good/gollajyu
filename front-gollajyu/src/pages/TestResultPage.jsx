import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VoteButton from "../components/VoteButton";
import TestResultHeader from "../components/TestResultHeader";
import TmpModal from "../components/TmpModal"; // 임시 모달
import sobiTIData from "../stores/testResultData.js";
import useModalStore from "../stores/modalState";
import useAuthStore from "../stores/userState";
import { debounce } from "lodash";

const items = [
  "프렌치 마카롱",
  "티라미수",
  "포춘쿠키",
  "지하철 만쥬",
  "곤약젤리",
  "오곡라떼",
  "콜라",
  "고구마 말랭이",
  "붕어빵",
  "나초",
  "에너지바",
  "슈크림",
  "우유식빵",
  "민트초코",
  "초코파이",
  "초코잼",
];

const TestResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  // ------------- 투표 생성 버튼 모달과 관련된 함수 -----------
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );

  const [isMyResult, setIsMyResult] = useState(true);
  const [result, setResult] = useState(1);
  const [matchingData, setMatchingData] = useState({});

  useEffect(() => {
    // 네비게이션 바 또는 마이페이지를 통해서 소비성향알려쥬로 진입했을 경우
    if (isMyResult) {
      setResult(user.typeId);
      setMatchingData(sobiTIData.find((data) => data.id === user.typeId));
    }
  }, []);

  useEffect(() => {
    // 소비성향 아이템 클릭 시, 해당 결과 렌더링
    window.scrollTo({ top: 0 });
    setMatchingData(sobiTIData.find((data) => data.id === result));
  }, [result]);

  return (
    <>
      <VoteButton />
      <div className="p-5">
        <div className="container mx-auto my-5 p-10 bg-white rounded-2xl sm:w-[220px] md:w-[330px] lg:w-[380px] xl:w-[550px] flex flex-col items-center relative">
          {isMyResult ? (
            <div className="font-bold w-full text-start absolute top-3 left-3">
              나의 결과
            </div>
          ) : (
            <div className="flex flex-wrap mb-5 justify-center">
              {items.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`m-1 px-3 py-2 border border-amber-200 rounded-lg ${
                      result === index + 1 ? `bg-amber-300` : ""
                    }`}
                    onClick={() => {
                      setResult(index + 1);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
          {matchingData && (
            <>
              <TestResultHeader data={matchingData} result={result} />
              <div
                id="description"
                className="bg-stone-100 p-10 rounded-lg break-keep"
              >
                {matchingData.description?.map((item, index) => (
                  <li className="p-2 fontsize-sm" key={index}>
                    {item}
                  </li>
                ))}
              </div>
              <div
                id="good_chemi"
                className="my-5 p-3 bg-stone-50 w-full flex flex-col border rounded-lg"
              >
                <p className="fontsize-md my-4 px-2">
                  <span className="fontsize-md text-red-400 font-bold">
                    환상
                  </span>
                  의 조합
                </p>
                <div className="p-3">
                  <p className="fontsize-sm">
                    {sobiTIData.find(
                      (data) => data.id === matchingData.good_chemi
                    )?.subTitle || null}
                  </p>
                  <p className="fontsize-md font-bold">
                    {sobiTIData.find(
                      (data) => data.id === matchingData.good_chemi
                    )?.title || null}
                  </p>
                </div>
              </div>
              <div
                id="bad_chemi"
                className="mb-5 p-3 bg-stone-50 w-full flex flex-col border rounded-lg"
              >
                <p className="fontsize-md my-4 px-2">
                  <span className="fontsize-md text-blue-600 font-bold">
                    환장
                  </span>
                  의 조합
                </p>
                <div className="p-3">
                  <p className="fontsize-sm">
                    {sobiTIData.find(
                      (data) => data.id === matchingData.bad_chemi
                    )?.subTitle || null}
                  </p>
                  <p className="fontsize-md font-bold">
                    {sobiTIData.find(
                      (data) => data.id === matchingData.bad_chemi
                    )?.title || null}
                  </p>
                </div>
              </div>
              {isMyResult ? (
                <button
                  className="w-2/3 p-5 rounded-full bg-amber-300 hover:bg-amber-400"
                  onClick={() => {
                    setIsMyResult(false);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  모든 결과 보기
                </button>
              ) : (
                <button
                  className="hover:font-bold"
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                  }}
                >
                  TOP
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {isVoteSimpleCreateModalOpened && <TmpModal></TmpModal>}
      {isVoteProductCreateModalOpened && <TmpModal></TmpModal>}
    </>
  );
};

export default TestResultPage;
