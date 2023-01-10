import { Home, Primary } from 'components/Hero';

interface Props {
  type?: string;
}

export const Hero: React.FC<Props> = ({ ...rest }) => {
  // These type keys are set as a single option in Sanity
  const types = {
    'home': <Home {...rest} />,
    'primary': <Primary {...rest} />,
    'secondary': <div>Secondary hero</div>,
  };
  const { type } = rest;
  const selectedHero = types.hasOwnProperty(type);
  return selectedHero ? types[type] : null;
};

export default Hero;
