import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestItem from "../components/TestItem";
import mainImg from "/assets/images/sobiTest/tmp_mainImg.png";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const TestPage = () => {
  const navigate = useNavigate();

  const questions = [
    "힘찬 하루를 다짐하며 시계를 보니 벌써 9시를 넘긴 시간, 지각하는 동기를 본 나는?",
    "외부 미팅을 진행하는 중... 갑자기 부장님이 째려보시는 것 같은데...?",
    "미팅을 마치고 내 자리에 앉아 열심히 일하는 중 들려오는 동료의 과자 먹는 소리!",
    "오전 일을 일찍 끝마치고 남는 시간, 점심 뭐 먹지..? 고민하는 나는…",
    "점심 식사 뒤 커피 수혈은 필수, 병원에서는 커피를 너무 많이 마시니 줄이라고 했었는데...",
    "사무실로 들어와 자료를 복사하기 위해 복사기로 향하는 나는...",
    "친하게 지내는 동기가 복권을 들고 기대에 부풀어 있을 때",
    "퇴근 후 친구와 쇼핑하려고 만났는데 친구가 안 어울리는 옷을 입고 와서 나에게 어떠냐고 물으면...",
    "의류 매장으로 들어가 바지를 입는 중, 어라...? 원래 맞던 사이즈인데... 잘 안 들어간다...?!",
    "바지를 구입 후, 명품관으로 가는 친구. 요즘 사치가 조금 심한 것 같은데...",
    "쇼핑을 마치고 매장을 나오던 중, 갖고싶은 한정판이 딱 하나 남았는데 이번 달 예산이 빠듯하면...",
    "친구와 헤어진 뒤 집으로 돌아온 나, 방에 들어가 쇼핑한 짐을 푸는데...",
  ];

  const answers = [
    [
      '"떼잉 쯧쯧..." 사무실 내 자리에 앉아 혀를 끌끌 찬다.',
      '"어.. 너도..?" 지하철 안 동기 옆자리에서 나란히 가고 있다.',
    ],
    [
      "'뭐지? 내가 너무 쓸데없는 말까지 한 건가?' 말을 너무 많이 한 것 같아 후회한다.",
      "'내가 아무런 말이 없어서 화가 나셨나...?' 나의 생각을 이야기하지 않은 것을 후회한다.",
    ],
    [
      "적막한 것보다는 어느 정도의 소리가 자극이 되기도 한다.",
      "나는 시끄러운 환경에서는 일을 제대로 할 수 없다.",
    ],
    [
      "리뷰를 찾아보고 평점이 높은 음식점을 고른다.",
      '"음... 일단 나가면 뭐라도 있겠지?" 감을 믿고 일단 나간다',
    ],
    [
      "'아쉽지만 건강을 위한 일이니까...' 커피가 안 들어간 음료를 마신다.",
      "'커피는 내 삶의 일부인 걸...?' 아메리카노 더블샷을 주문한다.",
    ],
    [
      '"점심 맛있게 먹었어요?" 지나가는 모든 직원에게 인사하며 말을 건다.',
      "'양면을 할까 단면을 할까...?' 목표는 오직 복사 뿐, 복사기로 직진한다.",
    ],
    [
      '"그거 당첨되어도 서울에 집 못 살텐데..." 현실적인 얘기를 해준다.',
      '"당첨되면 나는 노트북 하나면 돼~" 한 술 더 뜬다.',
    ],
    [
      '"그거 돈 주고 산 거 맞아...?" 직설적으로 말한다.',
      '"와.너.무.잘.어.울.려" 기분 좋은 말이라도 해준다.',
    ],
    [
      "현실과 타협해 지금 입기 적절한 바지를 산다.",
      "나는 다이어트에 성공할 수 있다. 이전에 입던 사이즈를 고수한다.",
    ],
    [
      '"너 돈이 참 많구나?" 할 말은 한다.',
      "'그럴만한 이유가 있겠지...?' 좋게좋게 생각한다.",
    ],
    [
      '"돈 없는 거렁뱅이가 뭘 사..." 아쉽지만 다음 기회를 노린다.',
      '"지금 아니면 언제 사겠어?"... 일단 할부로 지르고 본다.',
    ],
    [
      "바지는 접어서 서랍에, 패딩은 행거로... 모든 물건을 깔끔하게 정리한다.",
      "쇼핑백을 바닥에 던져두고 다음에 입을 때까지 열어보지 않는다.",
    ],
  ];

  const cheeringPhrase = [
    "나의 소비성향 알아보기 시-작",
    "영-차! 영-차!",
    "절반이 넘었어요!!",
    "곧 끝나요!!!",
  ];

  // question, answer를 "" 표시에서 자르거나 글자 길이로 자르거나 보기 편하게 수정하는 과정 필요함 => width 픽셀 고정으로 어느 정도 해결, 완전히는 아님

  const [response, setResponse] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(-1);

  const handleResponse = (answerType) => {
    // console.log(questionNumber, answerType);
    setResponse((prevResponse) => {
      return [...prevResponse, answerType];
    });
    setQuestionNumber(questionNumber + 1);
  };

  const goResultPage = () => {
    navigate("/TestResultPage", {
      state: {
        isFirstTime: true,
        response: response,
      },
    });
  };

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 6,
    borderRadius: 5,
    // transition: "all 2s",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "lightgrey",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#FFD257",
      animationDuration: "10s",
    },
  }));

  return (
    <div className="p-5 h-screen">
      <div className="container mx-auto my-5 p-10 bg-white rounded-2xl sm:w-[220px] sm:h-[330px] md:w-[330px] md:h-[390px] lg:w-[380px] lg:h-[450px] xl:w-[450px] xl:h-[530px]">
        <div>
          {questionNumber === -1 ? (
            <div className="flex flex-col items-center space-y-10 sm:space-y-16">
              <h1 className="text-center fontsize-lg">
                <span className="text-sky-600 fontsize-lg">선택</span>으로
                알아보는
                <br />
                <span className="text-lime-500 fontsize-lg">소비성향</span>{" "}
                테스트
              </h1>
              <img className="w-2/3 h-2/3" src={mainImg} alt="" />
              <button
                className="border rounded-full p-5 w-2/3 bg-amber-300"
                onClick={() => {
                  setQuestionNumber(questionNumber + 1);
                }}
              >
                테스트 시작하기
              </button>
            </div>
          ) : null}
          {questionNumber >= 0 && questionNumber <= 11 ? (
            <>
              <div className="mx-auto mb-5 max-w-lg transition ease-in duration-300">
                <div className="flex justify-between">
                  <p className="fontsize-xs">
                    {cheeringPhrase[Math.floor(questionNumber / 3)]}
                  </p>
                  <p className="fontsize-xs">{questionNumber + 1} /12</p>
                </div>
                <BorderLinearProgress
                  className=""
                  variant="determinate"
                  value={((questionNumber + 1) / 12) * 100}
                  // 애니메이션 적용 (후순위) -> 쉽지 않음
                />
              </div>
              <TestItem
                data={{
                  answer: answers[questionNumber],
                  question: questions[questionNumber],
                }}
                handleResponse={handleResponse}
              />
            </>
          ) : null}
          {questionNumber === 12 ? (
            <div className="flex flex-col items-center space-y-10 sm:space-y-16">
              <p className="text-center fontsize-lg">
                <span className="text-rose-500 fontsize-lg">두근두근</span>
                <br />
                당신의{" "}
                <span className="text-lime-500 fontsize-lg">소비성향</span>은?
              </p>
              <img className="w-2/3 h-2/3" src={mainImg} alt="" />
              <button
                className="border rounded-full p-5 w-2/3 bg-amber-300 text-lg"
                onClick={() => {
                  goResultPage();
                }}
              >
                결과 보러가기
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
