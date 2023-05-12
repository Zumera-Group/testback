import { ImageBlock } from 'components/BlogModules/ImageBlock';
import { ImageBlockModule, TextBlockModule } from '../../domain/blogModule';
import { ContentModule } from '../../domain/blogModule';
import { TextBlock } from 'components/BlogModules/TextBlock';

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
};
