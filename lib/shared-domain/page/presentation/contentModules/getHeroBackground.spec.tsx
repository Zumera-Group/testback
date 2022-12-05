import { getHeroBackground } from './getHeroBackground';

const specificContentModule = {
  getBackgroundImage: (data: any) => {
    if (data === 'bgMobile') return 'bgMobile';
    if (data === 'bg') return 'bg';

    return 'default';
  },
} as any;

it('test default', () => {
  expect(getHeroBackground(false, false, specificContentModule)).toEqual(
    'default',
  );
});

it('test bg', () => {
  expect(getHeroBackground(true, false, specificContentModule)).toEqual('bg');
});

it('test', () => {
  expect(getHeroBackground(false, true, specificContentModule)).toEqual(
    'default',
  );
});

it('test bgMobile', () => {
  expect(getHeroBackground(true, true, specificContentModule)).toEqual(
    'bgMobile',
  );
});
