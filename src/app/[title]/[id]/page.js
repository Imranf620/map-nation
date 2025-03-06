import RightMain from "@/components/RightMain";
import SingleGame from "@/components/SingleGame";
import React from "react";


const page = () => {
  return (
    <div className="flex md:flex-row flex-col pl-10 pr-4">
      <div className="flex-3">
        <SingleGame />
      </div>
      <div className="flex-1 flex justify-center items-center w-full">
        <RightMain />
      </div>
    </div>
  );
};

export default page;
