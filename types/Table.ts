import { NCR } from './NCR';
import { NG } from './NG';

export interface ReportTableProps {
    data: Report[];
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