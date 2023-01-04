import { useEffect, useState } from 'react';

import { Navigation } from "swiper";
import { Swiper } from 'swiper/react';
import 'swiper/css';

import { SCREEN_SIZE_LG, SCREEN_SIZE_XXL, CONTAINER_PADDING_X } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery'

import styles from './SwiperPeople.module.scss';

export const SwiperPeople = ({ prevButton, nextButton, classes, children }) => {

  const isDesktop = useMediaQuery(`(min-width: ${SCREEN_SIZE_LG})`);
  const isLargeDesktop = useMediaQuery(`(min-width: ${SCREEN_SIZE_XXL})`);
  const containerPaddingX = parseInt(CONTAINER_PADDING_X);

  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (!swiper || !prevButton.current || !nextButton.current) return;
    if (swiper.navigation) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper, prevButton, nextButton]);

  const slidesPerView = () => {
    if (isLargeDesktop) return 3.33;
    if (isDesktop) return 2.33;
    return 1.33;
  }

  const slidesOffsetAfter = () => {
    if (isLargeDesktop) return containerPaddingX * 3;
    return containerPaddingX * 1.5;
  }

  const spaceBetween = () => {
    if (isLargeDesktop) return containerPaddingX * 1.5;
    return containerPaddingX;
  }

  const swiperOptions = {
    modules: [Navigation],
    spaceBetween: spaceBetween(),
    slidesPerView: slidesPerView(),
    slidesOffsetAfter: slidesOffsetAfter(),
    slidesOffsetBefore: containerPaddingX,
    observer: true,
    observeParents: true,
    onSwiper: setSwiper,
    navigation: {
      prevEl: prevButton.current || null,
      nextEl: nextButton.current || null,
    }
  };

  return (
    <div className={[
        styles.wrapper,
        classes ? classes : ''
      ].join(' ')}
    >
      <Swiper {...swiperOptions}>
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperPeople;