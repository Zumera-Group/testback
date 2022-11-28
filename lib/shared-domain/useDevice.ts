// https://stackoverflow.com/questions/57776001/how-to-detect-ipad-pro-as-ipad-using-javascript
// for iPadPro we can only detect using maxTouchPoints
export const useIsIpad = () => {
  let isIpad = false as boolean;
  if (typeof window !== 'undefined') {
    const usrAgent = window?.navigator?.userAgent;
    const isIpadOS = () => {
      return (
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform)
      );
    };

    isIpad = !!usrAgent.match(/iPad|iPhone/i) || isIpadOS();
  }

  return isIpad;
};
