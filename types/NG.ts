export interface NG{
    id?: number; // Optional since it's auto-incremented
    ncr_date: string; // Should be in 'YYYY-MM-DD' format
    section: string;
    product_name: string;
    customer: string;
    last_process: string;
    value: number;
    ng_type: string;
    ng_quantity: number;
    operator: string;
    detection: string;
    status: 'repair' | 'reject'; // Restricted to these two values
    month: number;
    year: number;
  }
  