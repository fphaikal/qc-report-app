import { NCR } from './NCR';

export interface ReportTableProps {
    data: Report[];
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

export interface NCRTableProps {
    data: NCR[];
    handleDelete: (id: number) => void;
}