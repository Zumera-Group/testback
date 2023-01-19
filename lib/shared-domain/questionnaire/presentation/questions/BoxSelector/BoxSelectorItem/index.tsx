import Image from 'next/image';
import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import { useSelectAnswers } from '../useSelectAnswer';
import { useSelectBoxSelector } from 'lib/shared-domain/questionnaire/presentation/questions/BoxSelector/useSelectBoxSelector';
import RadioButton from 'components/Calculator/RadioButtonItem/RadioButtonItem';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  box: BoxAnswer;
  question: Question;
}

const SIZE = 120;

export const BoxSelectorItem = ({ box, question }: Props): JSX.Element => {
  const { isSelected, onSelectAnswer } = useSelectAnswers(
    question,
    box.boxContent || box.label,
  );
  const { onSelect } = useSelectBoxSelector({
    questionId: question?.questionId,
    box,
    onSelectAnswer,
  });

  const renderIcon = () => {
    if (!box.boxIcon) return null;
    const iconUrl = box.boxIcon?.iconImage?.asset?.url;
    const iconLabel = box.boxIcon?.name;

    return (
      <Image
        unoptimized
        loading="lazy"
        src={iconUrl}
        alt={iconLabel}
        height="42px"
        width="42px"
      />
    );
  };

  return (
    // <Square
    //   background={colors.white}
    //   border={borderBoxSelector}
    //   size={SIZE}
    //   flexDirection="column"
    //   justifyContent="space-evenly"
    //   cursor="pointer"
    //   onClick={onSelect}
    //   mx={1.5}
    //   mb={3}
    //   p={0.5}
    // >
    //   {renderIcon()}
    //   <Box textAlign="center">
    //     <P
    //       style={{
    //         hyphens: 'auto',
    //       }}
    //       variant="p"
    //       fontWeight={fontWeight}
    //       fontSize={fontSizes.tiny}
    //       color={color}
    //     >
    //       {box.label || box.boxContent}
    //     </P>
    //   </Box>
    // </Square>
    <>
      {/* {renderIcon()} */}
      {/* <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      > */}
      <RadioButton
        icon={renderIcon()}
        label={box.label || box.boxContent}
        onClick={onSelect}
        selected={isSelected}
      />
      {/* </Swiper> */}
    </>
  );
};
