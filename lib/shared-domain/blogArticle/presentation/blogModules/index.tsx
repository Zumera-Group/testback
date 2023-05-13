import { ImageBlock } from 'components/BlogModules/ImageBlock';
import {
  ImageBlockModule,
  QuoteBlockModule,
  TextBlockModule,
  TextImageParallaxBlockModule,
} from '../../domain/blogModule';
import { ContentModule } from '../../domain/blogModule';
import { TextBlock } from 'components/BlogModules/TextBlock';
import { TextImageParallaxBlock } from 'components/BlogModules/TextImageParallaxBlock/TextImageParallaxBlock';
import { QuoteBlock } from 'components/BlogModules/QuoteBlock';

export const getContentForContentModule = (
  contentModule: ContentModule,
  siteSettings: any,
  sharedContent?: any,
  allModulesData?: any,
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
};
