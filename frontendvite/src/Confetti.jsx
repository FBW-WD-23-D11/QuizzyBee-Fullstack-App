import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Confetti2() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}
