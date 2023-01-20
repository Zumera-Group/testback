import { Home, Primary } from 'components/Hero';
import { Transactions } from 'components/Hero/Transactions';
import { AnchorHero } from 'components/Hero/AnchorHero/AnchorHero';

interface Props {
  type?: string;
  allPageContent?: any[];
}

export const Hero: React.FC<Props> = ({ allPageContent, ...rest }) => {
  // These type keys are set as a single option in Sanity
  const types = {
    home: <Home {...rest} />,
    primary: <Primary {...rest} />,
    // secondary: <div>Secondary hero</div>,
    transaction: <Transactions {...rest} />,
    anchor: <AnchorHero allPageContent={allPageContent} {...rest} />,
  };
  const { type } = rest;
  const selectedHero = types.hasOwnProperty(type);
  return selectedHero ? types[type] : null;
};

export default Hero;
