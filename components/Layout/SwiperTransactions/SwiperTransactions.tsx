import { useEffect, useState } from 'react';

import { Navigation } from "swiper";
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { SCREEN_SIZE_LG, SCREEN_SIZE_SM, CONTAINER_PADDING_X } from 'lib/constants';

export const SwiperTransactions = ({ prevButton, nextButton, maxSlidesToShow, classes, children }) => {
  const [swiper, setSwiper] = useState(null);
  
  const spaceBetween = parseInt(CONTAINER_PADDING_X);
  const breakpoint_LG = parseInt(SCREEN_SIZE_LG);
  const breakpoint_SM = parseInt(SCREEN_SIZE_SM);

  useEffect(() => {
    if (!swiper || !prevButton.current || !nextButton.current) return;
    if (swiper.navigation) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
    return () => swiper.destroy(true, true);
  }, [swiper, prevButton, nextButton]);

  const swiperOptions = {
    modules: [Navigation],
    observer: true,
    observeParents: true,
    onSwiper: setSwiper,
    spaceBetween: 0,
    slidesPerView: 1,
    breakpoints: {
      [breakpoint_SM]: {
        slidesPerView: 2,
      },
      [breakpoint_LG]: {
        slidesPerView: maxSlidesToShow ? maxSlidesToShow : 3,
      }
    },
    navigation: {
      prevEl: prevButton.current || null,
      nextEl: nextButton.current || null,
    },
  };

  return (
    <Swiper {...swiperOptions} className={classes ? classes : ''}>
      {children}
    </Swiper>
  );
};

export default SwiperTransactions;