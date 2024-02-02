import React from "react";

const TestResultHeader = ({ data, result }) => {
  return (
    <>
      <p className="fontsize-md">{data.subTitle}</p>
      <p className="fontsize-xl font-bold mb-2">{data.title}</p>
      <img src={`/assets/images/sobiTest/${result}.png`} alt="" />
      <div className="flex justify-around sm:flex-col sm:space-x-0">
        {data.tag?.map((item, index) => (
          <p
            className="bg-amber-100 px-3 py-1 m-1 text-center rounded-lg fontsize-sm"
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
      <p className="my-10 fontsize-md text-center break-keep">
        {data.characteristic}
      </p>
    </>
  );
};

export default TestResultHeader;
