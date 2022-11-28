import React from 'react';

function getWindowDimensions() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions(),
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
