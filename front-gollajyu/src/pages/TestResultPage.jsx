import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sobiTIData from "/src/stores/TestResultData";

const getMBTI = (response) => {
  const MBTI = {
    ISTP: 0,
    ISFP: 1,
    ESTP: 2,
    ESFP: 3,
    ISTJ: 4,
    ISFJ: 5,
    ESFJ: 6,
    ESTJ: 7,
    INTJ: 8,
    INTP: 9,
    ENTJ: 10,
    ENTP: 11,
    INFJ: 12,
    INFP: 13,
    ENFJ: 14,
    ENFP: 15,
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

  const [isMyResult, setIsMyResult] = useState(true);
  const isFirstTime = location.state?.isFirstTime || false;
  const response = location.state?.response || [];
  const [result, setResult] = useState(0);
  const [matchingData, setMatchingData] = useState({});

  useEffect(() => {
    if (isFirstTime) {
      setResult(getMBTI(response));
      // 결과를 서버로 보내는 과정이 필요함
    }
  }, [isFirstTime, response]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setMatchingData(sobiTIData.find((data) => data.id === result));
  }, [result]);

  // console.log("isMyResult", isMyResult);
  return (
    <div className="p-5">
      <div className="container mx-auto my-5 p-10 bg-white rounded-2xl min-w-44 md:w-2/3 lg:w-2/5 flex flex-col items-center relative">
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
                    result === index ? `bg-amber-300` : ""
                  }`}
                  onClick={() => {
                    setResult(index);
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
            <p className="text-xl my-2">{matchingData.subTitle}</p>
            <p className="text-3xl font-bold mb-2">{matchingData.title}</p>
            <img src={`/assets/images/sobiTest/${result}.png`} alt="" />
            <div className="flex space-x-5">
              {matchingData.tag?.map((item, index) => (
                <p className="bg-amber-100 px-3 py-1 rounded-lg" key={index}>
                  {item}
                </p>
              ))}
            </div>
            <p className="my-10 text-xl">{matchingData.characteristic}</p>
            <div
              id="description"
              className="bg-stone-100 p-10 rounded-lg break-keep"
            >
              {matchingData.description?.map((item, index) => (
                <li className="p-2 text-lg" key={index}>
                  {item}
                </li>
              ))}
            </div>
            <div
              id="good_chemi"
              className="my-5 p-3 bg-stone-50 w-full flex flex-col border rounded-lg"
            >
              <p className="text-xl my-4 px-2">
                <span className="text-red-400 font-bold">환상</span>의 조합
              </p>
              <div className="p-3">
                <p>
                  {sobiTIData.find(
                    (data) => data.id === matchingData.good_chemi
                  )?.subTitle || null}
                </p>
                <p className="text-xl font-bold">
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
              <p className="text-xl my-4 px-2">
                <span className="text-blue-600 font-bold">환장</span>의 조합
              </p>
              <div className="p-3">
                <p>
                  {sobiTIData.find((data) => data.id === matchingData.bad_chemi)
                    ?.subTitle || null}
                </p>
                <p className="text-xl font-bold">
                  {sobiTIData.find((data) => data.id === matchingData.bad_chemi)
                    ?.title || null}
                </p>
              </div>
            </div>
            {isMyResult ? (
              <button
                className="w-2/3 p-5 rounded-full bg-amber-300"
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
  );
};

export default TestResultPage;
