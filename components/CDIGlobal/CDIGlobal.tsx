import { Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import { Button } from 'components/Button';

import dynamic from 'next/dynamic';
const GlobeAnimation = dynamic(() => import('./GlobeAnimation/GlobeAnimation'), {
  ssr: false
});
const Marquee = dynamic(() => import('./Marquee/Marquee'), {
  ssr: false
});
import styles from './CDIGlobal.module.scss';

interface Props {
  title?: string;
  title2?: string;
  subtitle?: string;
  description?: any;
  button?: any;
  locations?: Array<string>;
  sectionType?: string;
}

export const CDIGlobal: React.FC<Props> = ({ ...rest }) => {
  const {
    title,
    title2,
    subtitle,
    description,
    button,
    locations,
    sectionType,
  } = rest;

  const isHeader = sectionType === 'header';

  return (
    <Section
      size={'md'}
      bg={isHeader ? 'primary' : 'light'}
      color={isHeader ? 'white' : 'primary'}
      classes={[styles.section, isHeader ? styles.section__isHeader : ''].join(
        ' ',
      )}
    >
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.content}>
            {isHeader ? (
              <>
                <SectionHeading subtitle={subtitle} />
                <h1 className={styles.title}>
                  {title && title}
                  {title2 && <span>{title2}</span>}
                </h1>
                <SectionHeading description={description} />
              </>
            ) : (
              <SectionHeading
                headingType={'h3'}
                title={title}
                subtitle={subtitle}
                description={description}
              />
            )}

            {button?.page?.slug?.current && (
              <div className={styles.btnWrapper}>
                <Button
                  variant={'secondary'}
                  link={button?.page}
                  onDark={isHeader}
                >
                  {button?.text}
                </Button>
              </div>
            )}
          </div>
          <div className={styles.graphic}>
            <GlobeAnimation onDark={isHeader} />
          </div>
        </div>
      </div>
      <Marquee items={locations} />
    </Section>
  );
};

export default CDIGlobal;
