import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAuthStore from "../stores/userState";
import useModalStore from "../stores/modalState";

const SignupModal = () => {
  const setSignupModalClose = useModalStore(
    (state) => state.setSignupModalClose
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedGender, setSelectedGender] = useState("");
  const [birthday, setBirthday] = useState(dayjs(new Date()));

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  // handleSubmit의 인자가 되는 Submit 함수
  const submitForm = (data) => {
    if (!selectedGender) {
      window.alert("성별 입력은 필수입니다");
    } else {
      const date = new Date(birthday);
      data.gender = selectedGender;
      data.year = String(date.getFullYear());
      data.month =
        date.getMonth() >= 9
          ? String(date.getMonth() + 1)
          : "0" + (date.getMonth() + 1);
      data.day =
        date.getDate() >= 10 ? String(date.getDate()) : "0" + date.getDate();
      console.log(data);
      // 서버로 회원가입 요청
      // 로그인하고 소비성향테스트로 이동
      reset();
      setSignupModalClose();
      navigate("/TestPage");
    }
  };

  // 소셜로그인 핸들링 함수
  const handleKakaoLogin = () => {
    console.log("카카오로그인 시도");
  };
  const handleNaverLogin = () => {
    console.log("네이버로그인 시도");
  };

  const handleGoogleLogin = () => {
    console.log("구글로그인 시도");
  };

  return (
    <div
      id="outer-layer"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target.id == "outer-layer") {
          setSignupModalClose();
        }
      }}
    >
      <div
        id="inner"
        className="mx-auto container bg-white w-[550px] min-h-[670px] flex flex-col items-center rounded-3xl shadow-md"
      >
        <h1 className="text-4xl font-bold text-gray-700 mt-12 mb-16">
          회원가입해쥬
        </h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col w-3/5"
        >
          <div className="h-[80px]">
            {/* 이메일 => 형식: (대소문자 구분 없이 알파벳 + 숫자) + @ + (대소문자 구분 없이 알파벳 + 숫자) + . + (알파벳) */}
            <input
              type="text"
              id="email"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="이메일"
              {...register("email", {
                required: "필수 입력사항입니다",
                pattern: {
                  value: /^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z]+$/i,
                  message: "올바른 형식의 이메일을 입력하세요",
                },
              })}
            />
            {errors.email ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.email.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>
          <div className="h-[80px]">
            <input
              type="password"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              id="pw"
              placeholder="비밀번호"
              {...register("pw", {
                required: "필수 입력사항입니다",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상 15자 미만 이어야 합니다",
                },
                maxLength: {
                  value: 15,
                  message: "비밀번호는 15자 미만 이어야 합니다",
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                  message: "영문, 숫자, 특수문자를 1가지 이상 포함해야 합니다",
                },
              })}
            />
            {errors.pw ? (
              <p className="px-3 text-red-500 text-sm">{errors.pw.message}</p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>
          <div className="h-[80px]">
            <input
              id="pwConfirm"
              type="password"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="비밀번호 확인"
              {...register("pwConfirm", {
                required: "필수 입력사항입니다",
                validate: {
                  check: (val) => {
                    if (getValues("pw") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            />
            {errors.pwConfirm ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.pwConfirm.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-1 mb-4 mx-2">
            <p>
              생년
              <br />
              월일
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="YYYY/MM/DD"
                value={birthday}
                onChange={(newValue) => setBirthday(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="flex justify-between mb-10 mx-2">
            <label>성별</label>
            <div className="flex space-x-2">
              <label>
                <input
                  type="radio"
                  value="M"
                  className="mx-1"
                  checked={selectedGender === "M"}
                  onChange={handleGenderChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  value="F"
                  className="mx-1"
                  checked={selectedGender === "F"}
                  onChange={handleGenderChange}
                />
                여성
              </label>
            </div>
          </div>
          <label htmlFor="contract">
            <input id="contract" type="checkbox" required className="mx-1" />
            개인정보수집 및 이용약관에 동의합니다
          </label>
          <button
            type="submit"
            className="rounded-full bg-amber-300 hover:bg-amber-400 p-3 my-1"
          >
            골라쥬 동료 되기
          </button>
        </form>
        {/* <div id="social-login" className="w-full my-10">
        <div className="hr-sect w-1/2 mx-auto">
          <div className="flex items-center text-gray-400 my-2">
            <span className="flex-grow bg-gray-400 h-px m-1"></span>
            <span className="text-xs">소셜 회원가입</span>
            <span className="flex-grow bg-gray-400 h-px m-1"></span>
          </div>
        </div>
        <div
          id="social-icons"
          className="flex justify-around w-1/2 mx-auto my-3"
        >
          <div id="kakao" onClick={handleKakaoLogin}>
            <img
              src="/assets/images/social-login/kakao.png"
              alt=""
              className="w-10 h-10 rounded-full hover:outline hover:outline-2 outline-gray-300"
            />
          </div>
          <div id="naver" onClick={handleNaverLogin}>
            <img
              src="/assets/images/social-login/naver.png"
              alt=""
              className="w-10 h-10 rounded-full hover:outline hover:outline-2 outline-gray-300"
            />
          </div>
          <div id="google" onClick={handleGoogleLogin}>
            <img
              src="/assets/images/social-login/google.png"
              alt=""
              className="w-10 h-10 rounded-full hover:outline hover:outline-2 outline-gray-300"
            />
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};
export default SignupModal;
