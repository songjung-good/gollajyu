import React from "react";

const TestItem = (props) => {
  const { handleResponse, data } = props;
  const { question, answer } = data;
  return (
    <div className="container mx-auto flex flex-col space-y-10 justify-center items-center w-1/2">
      <h1 className="text-xl">{question}</h1>
      <div className="flex flex-col space-y-1 items-center">
        <button
          className="border border-black rounded-lg w-1/2 h-24"
          onClick={() => handleResponse(0)}
        >
          {answer[0]}
        </button>
        <button
          className="border border-black rounded-lg w-1/2 h-24"
          onClick={() => handleResponse(1)}
        >
          {answer[1]}
        </button>
      </div>
    </div>
  );
};

export default TestItem;
