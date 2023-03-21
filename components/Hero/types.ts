export type HeroComponentProps = React.PropsWithChildren<{
  title?: string;
  title2?: string;
  description?: any;
  button?: any;
  heroImage?: any;
  appointment?: any;
  bottomBackground?: any;
}>;

export type HeroComponent = React.FC<HeroComponentProps>;
