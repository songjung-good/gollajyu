import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import API_URL from "../stores/apiURL";
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

  const [prevEmail, setPrevEmail] = useState("");
  const [prevPW, setPrevPW] = useState("");

  const isSocialLogin = document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("gollajyu-cookie="));

  useEffect(() => {
    // gollajyu-cookie가 쿠키에 담겨 있으면, 소셜로그인을 한 사용자 -> 로직 처리 후, gollajyu-cookie 제거하기

    if (isSocialLogin) {
      axios.get(API_URL + "/members/addInfo").then((res) => {
        // console.log(res.data.body);
        setPrevEmail(res.data.body.email);
        setPrevPW("소셜 구글 로그인");
      });
    }
  }, []);
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
      if (isSocialLogin) {
        data.email = prevEmail;
        data.password = prevPW;
      }
      const date = new Date(birthday);
      data.gender = selectedGender;
      data.year = date.getFullYear();
      data.month = date.getMonth();
      data.day = date.getDate();
      console.log(data);
      // 로그인하고 소비성향테스트로 이동
      reset();
      window.alert("소비성향테스트까지 완료해야 회원가입이 됩니다^_^");
      setSignupModalClose();
      navigate("/TestPage", { state: { memberInfo: data } });
    }
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
        className="container mx-auto bg-white xl:w-[500px] xl:h-[740px] lg:w-[430px] lg:h-[645px] md:w-[370px] md:h-[555px] sm:w-[300px] sm:h-[465px] min-w-[300px] flex flex-col items-center rounded-3xl shadow-md"
      >
        <h1 className="text-4xl font-bold text-gray-700 mt-12 mb-16">
          회원가입해쥬
        </h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col w-2/3"
        >
          <div className="h-20">
            {/* 이메일 => 형식: (대소문자 구분 없이 알파벳 + 숫자) + @ + (대소문자 구분 없이 알파벳 + 숫자) + . + (알파벳) */}
            <input
              type="text"
              id="email"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="이메일"
              value={prevEmail ? prevEmail : undefined}
              {...register("email", {
                ...(isSocialLogin
                  ? {}
                  : {
                      required: "필수 입력사항입니다",
                      pattern: {
                        value:
                          /^[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*\.[A-Za-z]+$/i,
                        message: "올바른 형식의 이메일을 입력하세요",
                      },
                    }),
              })}
            />
            {!isSocialLogin && errors.email ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.email.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>
          <div className="h-20">
            <input
              type="password"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              id="password"
              placeholder="비밀번호"
              value={prevPW ? prevPW : undefined}
              {...register("password", {
                ...(isSocialLogin
                  ? {}
                  : {
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
                        value:
                          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                        message:
                          "영문, 숫자, 특수문자를 1가지 이상 포함해야 합니다",
                      },
                    }),
              })}
            />
            {!isSocialLogin && errors.password ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.password.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>
          <div className="h-20">
            <input
              id="verifyPassword"
              type="password"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="비밀번호 확인"
              value={prevPW ? prevPW : undefined}
              {...register("verifyPassword", {
                ...(isSocialLogin
                  ? {}
                  : {
                      required: "필수 입력사항입니다",
                      validate: {
                        check: (val) => {
                          if (getValues("password") !== val) {
                            return "비밀번호가 일치하지 않습니다.";
                          }
                        },
                      },
                    }),
              })}
            />
            {!isSocialLogin && errors.verifyPassword ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.verifyPassword.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>
          <div className="h-24">
            <input
              id="nickname"
              type="nickname"
              className="rounded-full bg-stone-100 w-full p-3 border border-white mb-1"
              placeholder="닉네임"
              {...register("nickname", {
                required: "필수 입력사항입니다",
                minLength: {
                  value: 2,
                  message: "닉네임은 2자 이상 이어야 합니다",
                },
                maxLength: {
                  value: 6,
                  message: "닉네임은 6자 미만 이어야 합니다",
                },
              })}
            />
            {errors.nickname ? (
              <p className="px-3 text-red-500 text-sm">
                {errors.nickname.message}
              </p>
            ) : (
              <p className="invisible text-sm">nothing</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-1 mb-4 mx-2">
            <p className="sm:w-[30px]">
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
      </div>
    </div>
  );
};
export default SignupModal;
