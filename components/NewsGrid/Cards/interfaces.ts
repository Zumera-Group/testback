export enum CardType {
  TwoNews = 'TwoNews',
  NewsBig = 'NewsBig',
  TransactionBig = 'TransactionBig',
  Empty = 'Empty',
  Download = 'Download',
  Employee = 'Employee',

  HighlightedCard = 'HighlightedCard',
}

export const CardsConfig = ({ isDownloadVisible, isHighlightedEnabled }) => [
  {
    type: CardType.Employee,
  },
  isHighlightedEnabled
    ? {
        type: CardType.HighlightedCard,
      }
    : null,
  {
    type: CardType.TwoNews,
    index1: 0,
    index2: 1,
  },
  {
    type: CardType.NewsBig,
    index1: 2,
  },
  {
    type: CardType.TransactionBig,
    index1: 0,
  },
  {
    type: CardType.NewsBig,
    index1: 3,
  },
  {
    type: CardType.NewsBig,
    index1: 4,
  },
  {
    type: CardType.TransactionBig,
    index1: 1,
  },
  {
    type: CardType.TransactionBig,
    index1: 2,
  },
  isDownloadVisible
    ? {
        type: CardType.Download,
      }
    : null,
];
