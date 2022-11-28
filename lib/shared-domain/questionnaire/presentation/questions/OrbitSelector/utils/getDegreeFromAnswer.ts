type getDegreeFromAnswerType = (
  answer: string,
  answerOptions: { label: string; value: string }[],
) => number;

const getDegreeFromAnswer: getDegreeFromAnswerType = (
  answer,
  answerOptions,
) => {
  // This method get the first degree (number) equivalent to an answer (string), ex: "not much" => 33
  const possibleAnswersIndex = answerOptions.length;

  const indexPos = answerOptions.findIndex((ele) => ele?.value === answer);

  if (indexPos > -1) {
    const range = 180 / possibleAnswersIndex;
    return range * (indexPos + 1);
  } else {
    return null;
  }
};

export default getDegreeFromAnswer;
