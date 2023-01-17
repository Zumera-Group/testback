import { useEffect, useState } from 'react';

import { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_XXL,
  CONTAINER_PADDING_X,
} from 'lib/constants';

import styles from './SwiperPeople.module.scss';

export const SwiperPeople = ({
  prevButton,
  nextButton,
  classes,
  children,
  xxlSlides = 3.33,
  lgSlides = 2.33,
  slides = 1.33,
}) => {
  const [swiper, setSwiper] = useState(null);

  const breakpoint_LG = parseInt(SCREEN_SIZE_LG);
  const breakpoint_XXL = parseInt(SCREEN_SIZE_XXL);
  const containerPaddingX = parseInt(CONTAINER_PADDING_X);

  useEffect(() => {
    if (!swiper || !prevButton.current || !nextButton.current) return;
    if (swiper.navigation) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper, prevButton, nextButton]);

  const swiperOptions = {
    modules: [Navigation],
    observer: true,
    observeParents: true,
    onSwiper: setSwiper,
    slidesPerView: slides,
    spaceBetween: containerPaddingX,
    // slidesOffsetAfter: containerPaddingX * 1.5,
    // slidesOffsetBefore: containerPaddingX,
    breakpoints: {
      [breakpoint_LG]: {
        slidesPerView: lgSlides,
        spaceBetween: containerPaddingX * 1.5,
        slidesOffsetAfter: containerPaddingX * 3,
      },
      [breakpoint_XXL]: {
        slidesPerView: xxlSlides,
        spaceBetween: containerPaddingX * 1.5,
        slidesOffsetAfter: containerPaddingX * 3,
      },
    },
    navigation: {
      prevEl: prevButton.current || null,
      nextEl: nextButton.current || null,
    },
  };

  return (
    <div className={[styles.wrapper, classes ? classes : ''].join(' ')}>
      <Swiper {...swiperOptions}>{children}</Swiper>
    </div>
  );
};

export default SwiperPeople;
