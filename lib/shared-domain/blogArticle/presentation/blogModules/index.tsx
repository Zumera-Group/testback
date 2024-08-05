import { ImageBlock } from 'components/BlogModules/ImageBlock';
import {
  ContentModule,
  DownloadPaperStickyFooterModule,
  FullWidthImageBlockModule,
  ImageBlockModule,
  QuoteBlockModule,
  TextBlockModule,
  TextImageParallaxBlockModule,
  TextStatsBlockModule,
  VideoBlockModule, WhitePaperInlineFormModule,
} from '../../domain/blogModule';
import { TextBlock } from 'components/BlogModules/TextBlock';
import { TextImageParallaxBlock } from 'components/BlogModules/TextImageParallaxBlock/TextImageParallaxBlock';
import { QuoteBlock } from 'components/BlogModules/QuoteBlock';
import { TextStatsBlock } from 'components/BlogModules/TextStatsBlock';
import { FullWidthImageBlock } from 'components/BlogModules/FullWidthImageBlock';
import VideoBlock from 'components/BlogModules/VideoBlock/VideoBlock';
import { DownloadPaperStickyFooter } from 'components/BlogModules/DownloadPaperStickyFooter';
import { WhitePaperInlineFormBlock } from 'components/BlogModules/WhitePaperInlineFormBlock';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';

export const getContentForContentModule = (
  contentModule: ContentModule,
  blogArticleDetail?: any,
  blogArticle?: BlogArticle,
  siteSettings?: SiteSettings,
  whitePaperInline?: WhitePaperInlineFormModule
): JSX.Element => {

  if (contentModule.specificContentModule instanceof TextBlockModule) {
    return (
      <TextBlock specificContentModule={contentModule.specificContentModule} />
    );
  }
  if (contentModule.specificContentModule instanceof ImageBlockModule) {
    return (
      <ImageBlock
        specificContentModule={contentModule.specificContentModule}
        defaultAlt={blogArticle?.articleTitle}
      />
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
  if (contentModule.specificContentModule instanceof WhitePaperInlineFormModule) {
    return (
      <WhitePaperInlineFormBlock
        specificContentModule={contentModule.specificContentModule}
        siteSettings={siteSettings}
      />
    );
  }
  if (contentModule.specificContentModule instanceof DownloadPaperStickyFooterModule) {
    return (
      <DownloadPaperStickyFooter
        specificContentModule={contentModule.specificContentModule}
        siteSettings={siteSettings}
        whitePaperInline={whitePaperInline}
      />
    );
  }
};
