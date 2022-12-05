/*/ 
- This will get the answer from an number between 0 to 180;
- This method is used for Orbit Selector, to retrieve the answer
  from a degree.
  1- We click on the div, and we get the 2 cords, (one is the center point and the other the client click/touch)
  2- we get the degree 
  3- from that number we can map the answer with this method
/*/

type getAnswerFromDegreeType = (
  degree: number,
  answerOptions: { label: string; value: string }[],
) => string;

const getAnswerFromDegree: getAnswerFromDegreeType = (
  degree,
  answerOptions,
) => {
  if (degree > 180 || degree < 0) return null;

  const numberOfAnswersIndex = answerOptions.length;

  const range = 180 / numberOfAnswersIndex;

  let response: string;
  for (let i = 0; i < answerOptions.length; i++) {
    const answer = answerOptions[i];
    if (degree <= range * (i + 1)) {
      // +1; index 0 not counted
      response = answer?.value;
      break;
    }
  }

  return response;
};
export default getAnswerFromDegree;
