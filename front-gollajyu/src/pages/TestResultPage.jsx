import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sobiTIData from "../components/TestResultData";

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

  const EI = response[2] + response[3] + response[6] < 0 ? "E" : "I",
    SN = response[4] + response[7] + response[9] < 0 ? "S" : "N",
    TF = response[8] + response[10] + response[11] < 0 ? "T" : "F",
    JP = response[1] + response[5] + response[12] < 0 ? "J" : "P";
  return MBTI[EI + SN + TF + JP];
};

const TestResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isFirstTime = location.state?.isFirstTime || false;
  const response = location.state?.response || [];
  const [result, setResult] = useState(0);
  const [matchingData, setMatchingData] = useState({});

  useEffect(() => {
    if (isFirstTime) {
      setResult(getMBTI(response));
    }
  }, [isFirstTime, response]);

  useEffect(() => {
    setMatchingData(sobiTIData.find((data) => data.id === result));
  }, [result]);

  return (
    <div className="p-5">
      {matchingData && (
        <div className="container mx-auto my-5 p-10 bg-white rounded-lg w-2/3 lg:w-1/2 flex flex-col items-center">
          <p className="text-xl my-2">{matchingData.subTitle}</p>
          <p className="text-3xl font-bold">{matchingData.title}</p>
          <div>
            {matchingData.tag?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResultPage;
