import React, { useEffect, useRef } from "react";
import { StyledTimeLine } from "./index.style";
import { DrawTimeLine } from "./DrawTimeLine";
// import useWindowDimensions from "../hooks/useWindowDimensions";

const TimeLine = () => {
  const headerCanvas = useRef(null);
  // const { width } = useWindowDimensions();
  const drawTimeLine = (p) => {
    DrawTimeLine({ headerCanvas: headerCanvas.current });
  };

  useEffect(() => {
    drawTimeLine({ headerCanvas });
  }, []);

  // useEffect(() => {
  //   drawTimeLine({ headerCanvas });
  // }, [width]);

  return (
    <StyledTimeLine>
      <div className="wrap z-index-1">
        <canvas ref={headerCanvas} />
      </div>
    </StyledTimeLine>
  );
};

export default TimeLine;
