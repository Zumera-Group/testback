import { Locale } from 'lib/locale';
import { Category, Question } from 'lib/shared-domain/questionnaire/domain';
import { SERVER_FETCHING_ERROR } from 'lib/shared-domain/page/constants';
import { filterDataToSingleItem } from 'lib/shared-domain/page/infrastructure/page.facade';
import { queryTaxCalculator, queryTaxCalculatorQuestion } from 'lib/shared-domain/tax-calculator/sanityQueries';
import { SanityService } from 'lib/services/sanity.service';
import { TaxCalculatorQuestionnaire } from 'lib/shared-domain/tax-calculator/types';

/**
 * Asynchronously retrieves questions for each category from a Sanity service.
 *
 * This function takes an array of category objects.
 * For each category, it fetches the detailed question data from Sanity,
 * This is because the initial data dont contain the question details. .
 *
 * Therefore, the ids are being used to fetch each question separately.
 *
 * Then each question fetched is then associated with its respective category, forming
 *
 * Note: This has been copied from the ON implementation and may need to be refactored
 */
const getQuestions = async (categories: any[]): Promise<Category[]> => {
  const sanityService = new SanityService();

  const questionsByCategory: Category[] = await Promise.all(
    categories?.map(async (category) => {
      const questions: Question[] = await Promise.all(
        (category?.questionSelector ? category?.questionSelector : []).map(
          async (questionRef) => {
            const question = await sanityService.fetch(
              queryTaxCalculatorQuestion(questionRef._ref),
            );
            return question;
          },
        ),
      );

      const categoryWithQuestions: Category = {
        categoryName: category.categoryName,
        questions: questions || [],
      };

      return categoryWithQuestions;
    }),
  );

  return questionsByCategory || [];
};

export const fetchTaxCalculator = async (
  lang: Locale,
  slug: string,
  preview?: boolean,
) => {
  const sanityService = new SanityService();
  const localizedQuery = queryTaxCalculator(sanityService.getSanityLocale(lang), slug);
  const data: TaxCalculatorQuestionnaire = await sanityService.fetch(localizedQuery, preview);
  if (!data) {
    throw new Error(SERVER_FETCHING_ERROR);
  }

  const taxQuestionnaire = filterDataToSingleItem(data, preview);
  const questionsByCategory = await getQuestions(taxQuestionnaire?.navigationCategories ?? []);

  const questionnaireWithCategories: TaxCalculatorQuestionnaire = {
    ...taxQuestionnaire,
    questionsByCategory,
  };

  return { questionnaireWithCategories, localizedQuery };
};


