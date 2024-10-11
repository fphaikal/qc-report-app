import { NCR } from './NCR';
import { NG } from './NG';

export interface ReportTableProps {
    data: Report[];
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

export interface NCRTableProps {
    data: NCR[];
    handleDelete: (id: number) => void;
}

export interface NGTableProps {
    data: NG[];
    handleDelete: (id: number) => void;
}