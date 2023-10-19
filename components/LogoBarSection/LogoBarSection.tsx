import styles from './LogoBarSection.module.scss';
import { LogoBarSectionModule } from 'lib/shared-domain/page/domain/contentModule';

export const LogoBarSection: React.FC<{
  specificContentModule: LogoBarSectionModule;
}> = ({ specificContentModule }) => {
  const { title } = specificContentModule;
  return (
    <section>
      <h1>{title}</h1>
    </section>
  );
};

export default LogoBarSection;
