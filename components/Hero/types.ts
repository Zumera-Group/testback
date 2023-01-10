export type HeroComponentProps = React.PropsWithChildren<{
  title?: string;
  title2?: string;
  description?: any;
  button?: any;
}>;

export type HeroComponent = React.FC<HeroComponentProps>;