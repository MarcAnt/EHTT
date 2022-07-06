import { useState, useEffect } from "react";

const useResize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(() => window.innerWidth);
      setHeight(() => window.innerHeight);
    });

    () => window.removeEventListener("resize", (e) => e);
  }, [window]);
  return { width, height };
};
export default useResize;
