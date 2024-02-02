import React from "react";

const TestItem = (props) => {
  const { handleResponse, data } = props;
  const { question, answer } = data;
  return (
    <div className="container mx-auto py-10 flex flex-col justify-between items-center sm:h-[280px] md:h-[330px] lg:h-[385px] xl:h-[460px]">
      <h1 className="my-10 sm:my-5 fontsize-sm text-center break-keep">
        {question}
      </h1>
      <div className="flex flex-col space-y-3 items-center h-1/2 sm:h-3/5">
        <button
          className="border border-amber-300 border-2 text-base rounded-full px-10 py-1 hover:bg-amber-200 w-full h-1/2 break-keep"
          onClick={() => handleResponse(0)}
        >
          {answer[0]}
        </button>
        <button
          className="border border-amber-300 border-2 text-base rounded-full px-10 py-1 hover:bg-amber-200 w-full h-1/2 break-keep"
          onClick={() => handleResponse(1)}
        >
          {answer[1]}
        </button>
      </div>
    </div>
  );
};

export default TestItem;
