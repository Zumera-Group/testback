type getDegreeFromCoordsType = (
  coords: { x: number; y: number },
  mainCord: { x: number; y: number },
) => number;

const getDegreeFromCoords: getDegreeFromCoordsType = (coords, mainCord) => {
  // This method gives the degree from 2 points (x,y), is used for orbit selector.
  const dx = mainCord.x - coords.x,
    dy = mainCord.y - coords.y;

  const deg = (Math.atan2(dy, dx) * 180) / Math.PI;

  return deg;
};

export default getDegreeFromCoords;
