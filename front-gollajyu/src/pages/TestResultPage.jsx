import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TestResultHeader from "../components/TestResultHeader";
import TmpModal from "../components/TmpModal"; // 임시 모달
import sobiTIData from "../stores/testResultData.js";
import useModalStore from "../stores/modalState";
import useAuthStore from "../stores/userState";
import API_URL from "../stores/apiURL";
import axios from "axios";
import { debounce } from "lodash";

const getMBTI = (response) => {
  const MBTI = {
    ISTP: 1,
    ISFP: 2,
    ESTP: 3,
    ESFP: 4,
    ISTJ: 5,
    ISFJ: 6,
    ESFJ: 7,
    ESTJ: 8,
    INTJ: 9,
    INTP: 10,
    ENTJ: 11,
    ENTP: 12,
    INFJ: 13,
    INFP: 14,
    ENFJ: 15,
    ENFP: 16,
  };

  const EI = response[1] + response[2] + response[5] < 2 ? "E" : "I",
    SN = response[4] + response[6] + response[8] < 2 ? "S" : "N",
    TF = response[7] + response[9] + response[10] < 2 ? "T" : "F",
    JP = response[0] + response[3] + response[11] < 2 ? "J" : "P";
  // console.log(EI + SN + TF + JP);
  return MBTI[EI + SN + TF + JP];
};

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
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const user = useAuthStore((state) => state.user);

  // ------------- 투표 생성 버튼 모달과 관련된 함수 -----------
  const isVoteSimpleCreateModalOpened = useModalStore(
    (state) => state.isVoteSimpleCreateModalOpened
  );
  const isVoteProductCreateModalOpened = useModalStore(
    (state) => state.isVoteProductCreateModalOpened
  );

  const [isMyResult, setIsMyResult] = useState(true);
  // const [isFirstTime, setIsFirstTime] = useState(
  //   location.state?.isFirstTime || false
  // );
  const isFirstTime = location.state?.isFirstTime || false;
  const memberInfo = location.state?.memberInfo || undefined;
  const response = location.state?.response || [];
  const [result, setResult] = useState(1);
  const [matchingData, setMatchingData] = useState({});

  useEffect(() => {
    // TestPage에서 넘어왔으면, getMBTI 함수를 통해서 결과를 구함 -> 회원정보에 테스트 결과를 담아서 서버로 보냄 (회원가입)
    if (isFirstTime) {
      setResult(getMBTI(response));
      setMatchingData(sobiTIData.find((data) => data.id === result));
      const typeId = getMBTI(response);
      memberInfo.typeId = typeId;
      console.log(memberInfo);
      signUp(memberInfo);
    }

    // 네비게이션 바 또는 마이페이지를 통해서 소비성향알려쥬로 진입했을 경우
    if (isMyResult && !isFirstTime) {
      setResult(user.typeId);
      setMatchingData(sobiTIData.find((data) => data.id === user.typeId));
    }
  }, []);

  useEffect(() => {
    // 소비성향 아이템 클릭 시, 해당 결과 렌더링
    window.scrollTo({ top: 0 });
    setMatchingData(sobiTIData.find((data) => data.id === result));
  }, [result]);

  // 1초 안에 호출되는 가장 마지막 api 호출만 실행 => react Strict Mode에 의해 useEffect가 두번 실행되어서 api 요청이 두번 가는 것을 방지함
  const signUp = useCallback(
    debounce((memberInfo) => {
      axios
        .post(API_URL + "/members", memberInfo)
        .then((response) => {
          console.log(response);
          if (!response.data.header.result) {
            console.log(response.data.header.message);
            navigate("/");
            window.alert("회원가입되지 않았음, 콘솔창 확인 바람");
          } else {
            window.alert(`${memberInfo.nickname}님 회원가입을 환영합니다.`);
            const data = {
              email: memberInfo.email,
              password: memberInfo.password,
            };
            logIn(data);
          }
        })
        .catch((err) => {
          console.log("회원가입 에러");
          console.log(err);
        });
    }, 1000),
    []
  );

  const logIn = (data) => {
    axios
      .post(API_URL + "/members/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("로그인 완료");
        setLoggedIn(response.data.body);
      })
      .catch((err) => {
        console.log("로그인 과정에서 에러남");
        console.log(err);
      });
  };

  return (
    <>
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
