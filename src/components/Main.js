import React from "react";
import LeftMain from "./LeftMain";
import RightMain from "./RightMain";

const Main = () => {
  return (
    <>
    <div className=" flex md:flex-row flex-col pl-2 pr-4">
      <div className="flex-3 mt-6 md:mt-0 ">
        <LeftMain />
      </div>
      <div className="flex-1 flex justify-center items-center w-full">
        <RightMain />
      </div>
    </div>
    </>
  );
};

export default Main;
