import React from "react";

const TestItem = (props) => {
  const { handleResponse, data } = props;
  const { question, answer } = data;
  return (
    <div className="container mx-auto flex flex-col space-y-10 justify-center items-center max-w-sm">
      <h1 className="my-24 text-2xl text-center">{question}</h1>
      <div className="flex flex-col space-y-3 items-center">
        <button
          className="border border-amber-300 border-2 text-lg rounded-full px-10 py-3 hover:bg-amber-200"
          onClick={() => handleResponse(0)}
        >
          {answer[0]}
        </button>
        <button
          className="border border-amber-300 border-2 text-lg rounded-full px-10 py-3 hover:bg-amber-200"
          onClick={() => handleResponse(1)}
        >
          {answer[1]}
        </button>
      </div>
    </div>
  );
};

export default TestItem;
