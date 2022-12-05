import getDegreeFromCoords from './getDegreeFromCoords';

describe('Obtaining degrees from 2 coords (x,y)', () => {
  // this cords are the center point.
  const mainCords = {
    x: 0,
    y: 0,
  };

  it('0 degrees case, only moving x to left.', () => {
    const cordsA = {
      x: -10,
      y: 0,
    };
    expect(getDegreeFromCoords(cordsA, mainCords)).toEqual(0);
    expect(getDegreeFromCoords(mainCords, mainCords)).toEqual(0);
  });

  it('180 degrees case, only moving x to right.', () => {
    const cordsA = {
      x: 10,
      y: 0,
    };
    expect(getDegreeFromCoords(cordsA, mainCords)).toEqual(180);
  });

  it('90 degrees case, only moving y to down.', () => {
    const cordsA = {
      x: 0,
      y: -10,
    };
    expect(getDegreeFromCoords(cordsA, mainCords)).toEqual(90);
  });
});
