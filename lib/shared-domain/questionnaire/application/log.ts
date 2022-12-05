import { EnvironmentService } from 'environment.service';

const debugQuestionnaire = !EnvironmentService.isProduction();

// logs for questionnaire
export const qLogs = (value) => {
  if (debugQuestionnaire) {
    console.log('📘 [QUESTIONNAIRE]', value);
  }
};
// error logs for questionnaire
export const qErrorLogs = (value) => {
  if (debugQuestionnaire) {
    console.log('🔴 [QUESTIONNAIRE]', value);
  }
};
