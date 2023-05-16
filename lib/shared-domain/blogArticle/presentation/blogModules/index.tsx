import { ImageBlock } from 'components/BlogModules/ImageBlock';
import {
  FullWidthImageBlockModule,
  ImageBlockModule,
  QuoteBlockModule,
  TextBlockModule,
  TextImageParallaxBlockModule,
  TextStatsBlockModule,
  VideoBlockModule,
} from '../../domain/blogModule';
import { ContentModule } from '../../domain/blogModule';
import { TextBlock } from 'components/BlogModules/TextBlock';
import { TextImageParallaxBlock } from 'components/BlogModules/TextImageParallaxBlock/TextImageParallaxBlock';
import { QuoteBlock } from 'components/BlogModules/QuoteBlock';
import { TextStatsBlock } from 'components/BlogModules/TextStatsBlock';
import { FullWidthImageBlock } from 'components/BlogModules/FullWidthImageBlock';
import VideoBlock from 'components/BlogModules/VideoBlock/VideoBlock';

export const getContentForContentModule = (
  contentModule: ContentModule,
  blogArticleDetail?: any,
): JSX.Element => {
  if (contentModule.specificContentModule instanceof TextBlockModule) {
    return (
      <TextBlock specificContentModule={contentModule.specificContentModule} />
    );
  }
  if (contentModule.specificContentModule instanceof ImageBlockModule) {
    return (
      <ImageBlock specificContentModule={contentModule.specificContentModule} />
    );
  }
  if (
    contentModule.specificContentModule instanceof TextImageParallaxBlockModule
  ) {
    return (
      <TextImageParallaxBlock
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof QuoteBlockModule) {
    return (
      <QuoteBlock specificContentModule={contentModule.specificContentModule} />
    );
  }
  if (contentModule.specificContentModule instanceof TextStatsBlockModule) {
    return (
      <TextStatsBlock
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (
    contentModule.specificContentModule instanceof FullWidthImageBlockModule
  ) {
    return (
      <FullWidthImageBlock
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof VideoBlockModule) {
    return (
      <VideoBlock
        specificContentModule={contentModule.specificContentModule}
        blogArticleDetail={blogArticleDetail}
      />
    );
  }
};
