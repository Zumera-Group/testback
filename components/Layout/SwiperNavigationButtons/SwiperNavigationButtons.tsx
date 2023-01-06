import { forwardRef } from "react";

import { Icon } from 'components/Icon';

import styles from './SwiperNavigationButtons.module.scss';

interface ButtonProps {
  type: 'prev' | 'next';
  ref: any;
};

const SwiperNavigationButtonComponent: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({ type }, ref) => {
  
  const buttonType = () => {
    let title: string, icon: string;
    if (type === 'prev') {
      title = 'Previous';
      icon = 'chevron-left-circle';
    }
    if (type === 'next') {
      title = 'Next';
      icon = 'chevron-right-circle';
    }
    return {
      title: title,
      icon: icon,
    };
  }
  return (
    <button
      ref={ref}
      type="button"
      className={styles.button}
      title={buttonType().title}
      aria-label={buttonType().title}
    >
      <Icon
        iconName={buttonType().icon}
        width={36}
        height={36} />
    </button>
  );
};

const SwiperNavigationButton = forwardRef(SwiperNavigationButtonComponent);

export const SwiperNavigationButtons = ({ prev, next }) => {
  return (
    <div className={styles.navigationButtons}>
      <SwiperNavigationButton type={'prev'} ref={prev} />
      <SwiperNavigationButton type={'next'} ref={next} />
    </div>
  );
}

export default SwiperNavigationButtons;