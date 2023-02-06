import { RefObject } from 'react';

type getCoordsPositionDivType = (
  e: TouchEvent & MouseEvent,
  doomElementToGetCoords: RefObject<any>,
) => { x: number; y: number };
// This gives the coords when a touch/click event is triggered of the div with the ref doomElementToGetCoords

const getCoordsPositionDiv: getCoordsPositionDivType = (
  evt,
  doomElementToGetCoords,
) => {
  const pos = { x: 0, y: 0 };

  if (
    evt.type == 'touchstart' ||
    evt.type == 'touchmove' ||
    evt.type == 'touchend' ||
    evt.type == 'touchcancel'
  ) {
    const touch = evt.changedTouches[0];
    pos.x = touch.pageX;
    pos.y = touch.pageY;
  } else if (
    evt.type == 'mousedown' ||
    evt.type == 'mouseup' ||
    evt.type == 'mousemove' ||
    evt.type == 'mouseover' ||
    evt.type == 'mouseout' ||
    evt.type == 'mouseenter' ||
    evt.type == 'mouseleave' ||
    evt.type == 'click' ||
    evt.type == 'dblclick'
  ) {
    pos.x = evt.pageX;
    pos.y = evt.pageY;
  }

  const coords = {
    x: pos.x - doomElementToGetCoords.current.offsetLeft,
    y: pos.y - doomElementToGetCoords.current.offsetTop,
  };

  return coords;
};
export default getCoordsPositionDiv;
