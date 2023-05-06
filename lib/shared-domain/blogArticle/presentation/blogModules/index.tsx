import {
  TransactionQuoteModule,
  TextBlockModule,
} from '../../domain/blogModule';
import { TransactionQuote } from 'components/TransactionQuote';
import { ContentModule } from '../../domain/blogModule';
import { TextBlock } from 'components/BlogModules/TextBlock';

export const getContentForContentModule = (
  contentModule: ContentModule,
  siteSettings: any,
  sharedContent?: any,
  allModulesData?: any,
): JSX.Element => {
  if (contentModule.specificContentModule instanceof TransactionQuoteModule) {
    return (
      <TransactionQuote
        specificContentModule={contentModule.specificContentModule}
      />
    );
  }
  if (contentModule.specificContentModule instanceof TextBlockModule) {
    return (
      <TextBlock specificContentModule={contentModule.specificContentModule} />
    );
  }
};
