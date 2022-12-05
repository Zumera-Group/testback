import { Employee } from './index';

export const getEmployeeFullName = (e: Employee) => {
  if (!e) return '';
  let fullName: string;
  if (!e?.firstName) fullName = e?.lastName;
  else fullName = e?.firstName + ' ' + e?.lastName;
  if (e.title) fullName = e?.title + ' ' + fullName;
  return fullName;
};
