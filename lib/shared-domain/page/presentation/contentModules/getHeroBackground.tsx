import { HeroSectionModule } from '../../domain/contentModule';

export function getHeroBackground(
  isDifferentMobileFromBigScreen: boolean,
  isMobileBg: boolean,
  specificContentModule: HeroSectionModule,
): string {
  if (!isDifferentMobileFromBigScreen)
    return `${specificContentModule.getBackgroundImage()}`;
  if (isMobileBg)
    return `${specificContentModule.getBackgroundImage('bgMobile')}`;
  return `${specificContentModule.getBackgroundImage('bg')}`;
}
