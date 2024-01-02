import { styled } from "@mui/material/styles";

const StyledTimeLine = styled("div")`
  position: relative;
  padding: 0 !important;
  height: 130px;
  transition: 0.3s;
  cursor: grab;

  .wrap {
    position: absolute;
    z-index: 2;
    background: white;
    cursor: default;
  }

  canvas {
    display: block;
  }
`;

export { StyledTimeLine };
