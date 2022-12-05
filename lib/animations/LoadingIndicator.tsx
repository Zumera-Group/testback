import React from 'react';
import { PageHeader } from '../shared-domain/page/presentation/PageHeader';
import { FlexCol, FlexCenterPage } from '../../components/Layout/Flex/Flex';
import Lottie from 'react-lottie';
import * as animationData from '../shared-domain/questionnaire/presentation/Result/loading.json';
import { SiteSettings } from '../shared-domain/page/domain/index';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const LoadingIndicator: React.FC<{ siteSettings?: SiteSettings }> = ({
  siteSettings,
}) => {
  return (
    <FlexCol
      width="100%"
      height="100vh"
      justifyContent="center"
      align="center"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      {siteSettings && (
        <PageHeader contentModules={[]} siteSettings={siteSettings} />
      )}
      <FlexCenterPage>
        <Lottie
          options={defaultOptions}
          height={150}
          width="100%"
          style={{
            maxWidth: 200,
          }}
          isStopped={false}
          isPaused={false}
        />
      </FlexCenterPage>
    </FlexCol>
  );
};

export default LoadingIndicator;
