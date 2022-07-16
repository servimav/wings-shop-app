export interface IBilling {
  id: number;
  type: 'SERVICE_TAX';
  value: number;
  comments?: string;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
}
