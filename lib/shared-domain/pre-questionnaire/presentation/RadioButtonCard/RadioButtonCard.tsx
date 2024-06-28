import React from 'react';
import Image from 'next/image';
import RadioButton from 'components/Calculator/RadioButtonItem/RadioButtonItem';


interface Props {
  handleSelection: () => void;
  isSelected: boolean;
  label: string,
  boxIcon: BoxSelector['boxIcon'],
  boxContent: string
  extraInfo: unknown[]
}

const Icon = ({ boxIcon }: { boxIcon: BoxSelector['boxIcon'] }) => {
  if (!boxIcon) return null;
  const iconUrl = boxIcon?.iconImage?.asset?.url;
  const iconLabel = boxIcon?.name;
  return (
    <Image
      unoptimized
      loading="lazy"
      src={iconUrl}
      alt={iconLabel}
      width={42}
      height={42}
    />
  );

};
export const RadioButtonCard: React.FC<Props> = ({
  handleSelection,
  isSelected,
  label,
  boxIcon,
  boxContent,
  extraInfo,
}) => {

  return (
    <RadioButton
      icon={<Icon boxIcon={boxIcon} />}
      label={label || boxContent}
      onClick={handleSelection}
      selected={isSelected}
      extraInfo={extraInfo}
    />
  );
};

