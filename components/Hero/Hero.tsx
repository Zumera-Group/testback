import { Home, Primary } from 'components/Hero';
import { Transactions } from 'components/Hero/Transactions';
import { AnchorHero } from 'components/Hero/AnchorHero/AnchorHero';
import { Career } from 'components/Hero/Career';
import { Landing } from 'components/Hero/Landing';

interface Props {
  title?: string;
  title2?: string;
  description?: any;
  type?: string;
  allPageContent?: any[];
}

export const Hero: React.FC<Props> = ({ allPageContent, ...rest }) => {
  // These type keys are set as a single option in Sanity
  const types = {
    home: <Home {...rest} />,
    primary: <Primary {...rest} />,
    career: <Career {...rest} />,
    transaction: <Transactions {...rest} />,
    anchor: <AnchorHero allPageContent={allPageContent} {...rest} />,
    landing_dark: <Landing {...rest} type={'dark'} />,
    landing_light: <Landing {...rest} type={'light'} />,
  };
  const { type } = rest;
  const selectedHero = types.hasOwnProperty(type);
  return selectedHero ? types[type] : null;
};

export default Hero;
