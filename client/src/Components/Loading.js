import ScaleLoader from "react-spinners/ScaleLoader";
import React from "react";

const Loading = () => {
  return (
    <div>
      <ScaleLoader
        color="#3c8cd8"
        height={45}
        margin={2}
        radius={15}
        width={9}
      />
    </div>
  );
};

export default Loading;
