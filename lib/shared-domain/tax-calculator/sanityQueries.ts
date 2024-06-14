export const queryTaxCalculator = (
  lang,
  slug,
) => `*[_type == "taxCalculator" && _lang == "${lang}" && questionnaireSlug.current == "${slug}"] {
  "questionnaireName": questionnaireName,
  "seoDescription": seoDescription,
  "seoImage": seoImage.asset->url,
  "preventIndexing": preventIndexing,
  "questionnaireSlug": questionnaireSlug.current,
  "navigationCategories": navigationCategories[],
  "variantOfTheResultPage": variantOfTheResultPage,
  resultScreenCopy {
    ...,
    sideBar {
      ...,
      bookletImage {
        asset->{
          url,
          type
        }
      }
    }
  },
  resultScreenModules {
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
}
`;

export const queryTaxCalculatorQuestion = (
  ref,
) => `*[_type == "taxCalculatorQuestions" && _id == "${ref}"][0] {
  _id,
  _lang,
  navigationTitle,
  questionId,
  questionText,
  description,
  salesforceId,
  showMoreButton,
  hasMultipleAnswers,
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

export const queryPreQuestionnaire: QueryPreQuestionnaire = (
  lang,
  slug,
) => `*[_type == "preCalculator" && _lang == "${lang}" && preCalculatorSlug.current == "${slug}"] {
  _id,
  _lang,
  preCalculatorName,
  seoDescription,
  seoImage{
    asset->{
      url,
      metadata{
        dimensions{
          height,
          width
        }
      }
    }
  },
  preventIndexing,
  question{
    ...
  },
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
    },
    calculatorPage->{
      _id,
      _lang,
      _type,
      questionnaireName,
      questionnaireSlug,
    },
  },
  nextButtonText
}`;