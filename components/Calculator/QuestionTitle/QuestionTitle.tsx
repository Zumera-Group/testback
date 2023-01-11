import { StringLiteral } from 'typescript';

interface Props {
  title: string;
  description: string;
}
const QuestionTitle: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );
};

export default QuestionTitle;
