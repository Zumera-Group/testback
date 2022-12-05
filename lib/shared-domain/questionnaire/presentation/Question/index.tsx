import { links } from 'lib/links';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import { useRouter } from 'next/router';
import { getTranslateByScope } from '../../../../../translation/i18n';

export const t = getTranslateByScope('sidebar');

export const useQuestionnaireRouter = () => {
  const { questionnaire, setIsFadingOut } = useValuationStore();
  const router = useRouter();

  const baseUrl = links().questionnaires(questionnaire);
  return {
    pushQuestion: (mainStep: string | number, subStep: string | number) => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsFadingOut(false);

        router.push(baseUrl + `#${mainStep}-${subStep}`);
      }, 800);
    },
  };
};
