import { useState, useLayoutEffect } from 'react';

export const useGetWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(window.innerWidth)
  useLayoutEffect(() => {
    const getWidth = () => {
      setWindowWidth(window.innerWidth);
      console.log(windowWidth)
    };
    window.addEventListener("resize", getWidth);
    var resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          getWidth();
        }, 500);
      }
    }
    return () => window.removeEventListener("resize", resizeThrottler);
  }, [])
  return windowWidth;
}
