import { useBreakpointValue } from '@chakra-ui/media-query';

export enum CardType {
  TwoNews = 'TwoNews',
  NewsBig = 'NewsBig',
  TransactionBig = 'TransactionBig',
  Empty = 'Empty',
  Download = 'Download',
  Employee = 'Employee',
}

export const gridItemsConfig = ({ isDownloadVisible }) => [
  { type: CardType.Employee },
  {
    type: CardType.TwoNews,
    index1: 0,
    index2: 1,
  },
  { type: CardType.NewsBig, index1: 2 },
  { type: CardType.TransactionBig, index1: 0 },
  { type: CardType.NewsBig, index1: 3, light: true },
  { type: CardType.NewsBig, index1: 4, light: true },
  { type: CardType.TransactionBig, index1: 1 },
  { type: CardType.TransactionBig, index1: 2 },
  isDownloadVisible
    ? {
        type: CardType.Download,
        colspan: 2,
      }
    : null,
];

export const useNewsGridWidthSizes = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  let items = [
    '45%',
    '55%',
    '55%',
    '45%',
    '45%',
    '55%',
    '45%',
    '55%',
    '45%',
    '55%',
    '45%',
    '55%',
    '45%',
    '55%',
  ];

  if (isMobile) {
    items = items.map(() => '100%');
  }

  return items;
};
