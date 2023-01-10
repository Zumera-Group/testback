export const getCursorPosition = (event, refElement) => {
  const refElementWidth = refElement.offsetWidth;
  const refElementHeight = refElement.offsetHeight;

  let x = Math.round(event.pageX / refElementWidth * 100);
  let y = Math.round(event.pageY / refElementHeight * 100); 

  if (event.pageY > refElementHeight) {
    y = 100; // 100% background position
  }

  const position = {
    x: x,
    y: y,
  };

  return position;
}