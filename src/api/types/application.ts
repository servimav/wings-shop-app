export interface IAppInfo {
  id: number;
  title: string;
  description: string;
  version: string;
  version_code: number;
  comments: string;
  tax: number;
  tax_type: 'FREE' | 'MONTHLY' | 'ORDER_PORCENT' | 'ORDER_FIX';
  created_at: string;
  updated_at: string;
  token: string;
}
