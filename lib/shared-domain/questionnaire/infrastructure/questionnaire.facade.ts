import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Category, Question, Questionnaire } from '../domain';
import { SanityIcon } from '../domain/index';
import { filterDataToSingleItem } from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const queryQuestionnaire = (
  lang,
  slug,
) => `*[_type == "valueCalculator" && _lang == "${lang}" && questionnaireSlug.current == "${slug}"] {
  _id,
  _lang,
  questionnaireSlug {
    current
  },
  questionnaireName,
  isNoah,
  result {
    greenCheckmarkTexts,
    authors {
      authorsTitle,
      author1 -> {
        jobTitle,
        firstName,
        lastName,
        email,
        slug,
        calendlyURL,
        _id,
        title,
        cardPicture {
          ...
          picture {
            asset->{
              url,
              type
            },
          }
        },
      },
      author2 -> {
        jobTitle,
        firstName,
        lastName,
        email,
        slug,
        calendlyURL,
        _id,
        title,
        cardPicture {
          ...
          picture {
            asset->{
              url,
              type
            },
          }
        },
      }
    },
    growthRatesTable,
    heroSection,
    logoBarSection{
      title,
      logos[]{
        asset->{
          url,
          metadata{
            dimensions{
              height,
              width
            }
          }
        },
      }
    }
  },
  sectorSpecific,
  checkmarkTexts,
  "categories": navigationCategories[],
  seoImage {
    asset->{
      url
    }
  },
  seoDescription,
  preventIndexing
}`;

const queryQuestionnaires = () => `*[_type == "valueCalculator"] {
  _id,
  _lang,
  questionnaireSlug {
    current
  }
}`;

const queryQuestion = (
  ref,
) => `*[_type == "generalQuestions" && _id == "${ref}"][0] {
  _id,
  _lang,
  navigationTitle,
  questionId,
  questionText,
  description,
  salesforceId,
  showMoreButton,
  hasMultipleAnswers,
  growthNoahCategory,
  sustainabilityNoahCategory,
  isRequired,
  answerSelector{
    answerType,
    orbitSelector{
      answerOptions[]{
        label,
        value
      }
    },
    slider{
      from,
      gap,
      to,
      valueType,
      salesforceFormat,
      subGaps
    },
    textInput,
    numberInput{
      valueType,
      placeholder,
      salesforceFormat,
      label
    },
    multiTextInput[],
    boxSelector[]{
      _key,
      boxContent,
      label,
      boxIcon->{
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      }
    }
  },
}`;

const querySectorSpecificQuestions = (
  lang,
) => `*[_type == "sectorSpecificQuestions" && _lang == "${lang}"] {
  _id,
  _lang,
  navigationTitle,
  questionId,
  questionText,
  salesforceId,
  showMoreButton,
  hasMultipleAnswers,
  industries[]-> {
    id,
    name,
    industrySheetName,
  },
  answerSelector{
    answerType,
    orbitSelector{
      answerOptions[]{
        label,
        value
      }
    },
    slider{
      from,
      gap,
      to,
      valueType,
      subGaps
    },
    textInput,
    multiTextInput[],
    boxSelector[]{
      _key,
      label,
      boxContent,
      boxIcon->{
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      }
    }
  },
}`;

export class QuestionnaireFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getQuestionnaire(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ questionnaireWithCategories: Questionnaire; query: string }> {
    const query = queryQuestionnaire(
      this.sanityService.getSanityLocale(lang),
      slug,
    );
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }

    const questionnaire = filterDataToSingleItem(data, preview);
    const questionsByCategory = await this.getQuestions(
      questionnaire?.categories ?? [],
    );

    const questionnaireWithCategories = {
      ...questionnaire,
      questionsByCategory,
    };

    return { questionnaireWithCategories, query };
  }

  async getQuestionnaires(): Promise<Questionnaire[]> {
    const questionnaires = await this.sanityService.fetch(
      queryQuestionnaires(),
    );

    return questionnaires;
  }

  async getSectorSpecificQuestions(lang: Locale): Promise<Question[]> {
    const sectorSpecificQuestions = await this.sanityService.fetch(
      querySectorSpecificQuestions(this.sanityService.getSanityLocale(lang)),
    );

    return sectorSpecificQuestions;
  }

  async getQuestions(categories: any[]): Promise<Category[]> {
    const questionsByCategory: Category[] = await Promise.all(
      categories?.map(async (category) => {
        const questions: Question[] = await Promise.all(
          (category?.questionSelector ? category?.questionSelector : []).map(
            async (questionRef) => {
              const question = await this.sanityService.fetch(
                queryQuestion(questionRef._ref),
              );
              return question;
            },
          ),
        );

        const categoryWithQuestions: Category = {
          categoryName: category.categoryName,
          questions: questions || [],
          isSectorSpecificCategory: false,
        };

        return categoryWithQuestions;
      }),
    );

    return questionsByCategory || [];
  }
}
