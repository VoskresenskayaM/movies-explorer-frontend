import { useState, useLayoutEffect } from 'react';

export const useGetWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 
 
  useLayoutEffect(() => {

    const getWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          getWidth();
        }, 500);
      }
    }
    window.addEventListener("resize", resizeThrottler);
    getWidth()
    return () => window.removeEventListener("resize", resizeThrottler);
  }, [])
  return windowWidth;
}
