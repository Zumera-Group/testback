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
  "resultScreenCopy": resultScreenCopy
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
