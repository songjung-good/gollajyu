// 리액트 및 훅/라이브러리
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// HTTP 요청을 위한 Axios 라이브러리
import axios from "axios";

// API URL 설정
import API_URL from "/src/stores/apiURL";

// 반응형 웹 디자인을 위한 유틸리티 함수
import { useResponsiveQueries } from "/src/stores/responsiveUtils";

// 커스텀 스토어를 이용한 상태 관리
import useAuthStore from "/src/stores/userState";
import useModalStore from "/src/stores/modalState";

// 소비성향 결과 컴포넌트
import TestItem from "../components/TestItem";

// 이미지 가져오기
import mainImg from "/assets/images/sobiTest/tmp_mainImg.png";

// Material-UI에서 제공하는 LinearProgress 및 스타일링 관련 컴포넌트
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";



const TestPage = () => {

  // ------------------ 반응형 웹페이지 구현 ------------------
  const { isXLarge, isLarge, isMedium, isSmall } = useResponsiveQueries();
  
  const navigate = useNavigate();
  const location = useLocation();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

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

  // TODO 테스트 페이지에서 벗어날 때, 회원가입이 진행되지 않는다는 알림창이 뜨도록 하고 싶음

  const handleResponse = (answerType) => {
    // console.log(questionNumber, answerType);
    setResponse((prevResponse) => {
      return [...prevResponse, answerType];
    });
    setQuestionNumber(questionNumber + 1);
  };

  const signUp = (memberInfo) => {
    const isSocialLogin = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("gollajyu-cookie="));

    if (isSocialLogin) {
      // 소셜로그인인데, 신규가입자인 경우
      const socialMemberInfo = {
        email: memberInfo.email,
        nickname: memberInfo.nickname,
        year: memberInfo.year,
        month: memberInfo.month,
        day: memberInfo.day,
        gender: memberInfo.gender == "F" ? "FEMALE" : "MALE",
        typeId: memberInfo.typeId,
      };
      // console.log(socialMemberInfo);
      axios
        .put(API_URL + "/members", socialMemberInfo)
        .then((response) => {
          // console.log("소셜로그인 회원가입:", response);
          if (!response.data.header.result) {
            // console.log(response.data.header.message);
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
          document.cookie =
            "gollajyu-cookie" +
            "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        })
        .catch((err) => {
          // console.log("회원가입 에러");
          // console.log(err);
        });
    } else {
      // 일반 신규 가입자인 경우
      axios
        .post(API_URL + "/members", memberInfo)
        .then((response) => {
          // console.log(response);
          if (!response.data.header.result) {
            // console.log(response.data.header.message);
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
          // console.log("회원가입 에러");
          // console.log(err);
        });
    }
  };

  const logIn = (data) => {
    axios
      .post(API_URL + "/members/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("로그인 완료");
        setLoggedIn(response.data.body);
        // 로그인 후, 테스트 결과 페이지로 이동
        navigate("/TestResultPage");
      })
      .catch((err) => {
        // console.log("로그인 과정에서 에러남");
        // console.log(err);
      });
  };

  const goResultPage = () => {
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

    // 테스트 결과(typeId)를 memberInfo에 담아서 회원가입 및 로그인 시키기
    const memberInfo = location.state.memberInfo;
    const result = getMBTI(response);
    memberInfo.typeId = result;
    // console.log(memberInfo);
    signUp(memberInfo);
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


  // --------------------------------- css 시작 ---------------------------------

  // ----------- body 스타일 -----------
  const bodyStyle = {
    // 디자인
    margin: "0 auto", // 가로 중앙 정렬
    padding: "30px 0", // 상하단 여백: 50px
    width: isXLarge ? "1000px" : isLarge ? "740px" : isMedium ? "460px" : "375px",
    // whiteSpace: "nowrap", // 줄바꿈 방지

    // 컨텐츠 정렬
    display: "flex",
    justifyContent: "center",
  };

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const contentContainerStyle = {
    // 디자인
    padding: isXLarge ? "40px" : isLarge ? "35px" : isMedium ? "30px" : "25px",
    width: isXLarge ? "50%" : isLarge ? "60%" : "80%",
    height: isXLarge ? "750px" : isLarge ? "675px" : isMedium ? "600px" : "525px",
    borderRadius: isXLarge ? "50px" : isLarge ? "40px" : isMedium ? "30px" : "20px",
    background: "#FFFFFF",
  };

  // ----------- 컨테이너 스타일 -----------
  const containerStyle = {
    // 디자인
    height: isXLarge ? "670px" : isLarge ? "605px" : isMedium ? "540px" : "475px",
    
    // 컨텐츠 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  }

  // ----------- 컨텐츠 컨테이너 스타일 -----------
  const imgStyle = {
    padding: "0 40px",
  }

  // --------------------------------- css 끝 ---------------------------------

  
  return (
    <>
      <div style={bodyStyle} className="h-screen">
        <div style={contentContainerStyle}>
          <div>
            {questionNumber === -1 ? (
              <div style={containerStyle}>
                <h1 className="text-center fontsize-lg">
                  <span className="text-sky-600 fontsize-lg">선택</span>
                  으로 알아보는
                  <br />
                  <span className="text-lime-500 fontsize-lg">소비성향</span>{" "}
                  테스트
                </h1>
                <img style={imgStyle} src={mainImg} alt="" />
                <button
                  className="border rounded-full p-4 w-2/3 bg-amber-300 hover:bg-amber-400"
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
                <div>
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
                </div>
              </>
            ) : null}
            {questionNumber === 12 ? (
              <div style={containerStyle} className="flex flex-col items-center space-y-10 sm:space-y-16">
                <p className="text-center fontsize-lg">
                  <span className="text-rose-500 fontsize-lg">두근두근</span>
                  <br />
                  당신의{" "}
                  <span className="text-lime-500 fontsize-lg">소비성향</span>은?
                </p>
                <img style={imgStyle} src={mainImg} alt="" />
                <button
                  className="border rounded-full p-4 w-2/3 bg-amber-300 hover:bg-amber-400"
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
    </>
  );
};

export default TestPage;
