const TIMELINE_HEIGHT = 90;

const toTime = (s, withMilliSecond) => {
  try {
    if (withMilliSecond) return new Date(s * 1000).toISOString().substr(11, 11);
    return new Date(s * 1000).toISOString().substr(11, 8);
  } catch (error) {
    return "";
  }
};

const drawXaxis = ({ ctx, shift, zoomLevel, rat, w, endTime }) => {
  ctx.beginPath();
  let counter = 0;
  let initNumber = shift % zoomLevel;
  for (let i = initNumber; i < w; i += zoomLevel / rat) {
    if (counter % rat === 0) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 30);
      if (zoomLevel > 50) {
        ctx.fillText(
          ` ${toTime((i - shift) / zoomLevel)}`,
          i,
          30,
          zoomLevel - 2
        );
      } else if (counter % (rat * rat) === 0) {
        // let viewPortTime = endTimeShow - beginingTimeShow;
        ctx.fillText(
          ` ${new Date(((i - shift) / zoomLevel) * 1000)
            .toISOString()
            .substr(endTime > 7000 ? 11 : 14, 5)}`,
          i,
          10,
          zoomLevel - 2
        );
      }
    } else {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 10);
    }
    counter++;
  }

  ctx.closePath();
  ctx.stroke();
};

const drawVerticalGrid = ({ ctx, shift, zoomLevel, rat, w, h }) => {
  let initNumber = shift % zoomLevel;

  for (let i = initNumber; i < w; i += zoomLevel / rat) {
    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      // ctx.moveTo(i, 0);
      ctx.closePath();
      ctx.stroke();
    }
  }
};

export const DrawTimeLine = ({ headerCanvas }) => {
  let bgCtx = headerCanvas.getContext("2d");
  let w = (headerCanvas.width =
    headerCanvas.parentElement.parentElement.clientWidth);
  let h = (headerCanvas.height = TIMELINE_HEIGHT);
  let endTime = 60;
  let shift = 0;
  let zoomLevel = w / endTime || 1;

  let globalRatio = 1;

  const drawBG = (context, r = 1) => {
    let rat = 5;
    if (zoomLevel > 50) rat = 10;
    if (zoomLevel > 100) rat = 15;
    if (zoomLevel > 150) rat = 20;
    if (zoomLevel > 200) rat = 25;

    globalRatio = globalRatio * r;
    context.save();
    context.clearRect(0, 0, headerCanvas.width, headerCanvas.height);
    context.fillStyle = "transparent";
    context.fillRect(0, 0, w, h);
    context.lineWidth = 0.3;
    context.strokeStyle = "lightgrey";
    context.fillStyle = "grey"; // vertical grid
    drawVerticalGrid({ ctx: context, shift, zoomLevel, rat, w, h });
    context.lineWidth = 0.5;
    context.strokeStyle = "grey"; //X-Axis

    drawXaxis({ ctx: context, shift, zoomLevel, rat, w, endTime });
  };

  drawBG(bgCtx);

  const resize = () => {
    w = headerCanvas.width =
      headerCanvas.parentElement.parentElement.clientWidth;
    h = headerCanvas.height = TIMELINE_HEIGHT;
    console.log("resize");
    drawBG(bgCtx);
  };

  const addListenerHandlers = () => {
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", resize);
  };
  addListenerHandlers();
  return 1;
};
