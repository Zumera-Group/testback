import { Office } from '../../offices/domain/index';

export interface Job {
  _id: string;
  employmentType: string;
  department: string;
  qualifications: string[];
  title: string;
  subtitle: string;
  description: string;
  link: string;
  linkText: string;
  office: Office;
  unit: 'saxco' | 'digital';
}
