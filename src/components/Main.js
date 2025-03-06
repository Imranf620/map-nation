import React from "react";
import LeftMain from "./LeftMain";
import RightMain from "./RightMain";
import Footer from "./footer";

const Main = () => {
  return (
    <>
    <div className=" flex md:flex-row flex-col pl-2 pr-4">
      <div className="flex-3">
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
