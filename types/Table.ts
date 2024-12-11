import { NCR } from './NCR';
import { NG } from './NG';

export interface ReportTableProps {
    data: Report[];
    handleDelete: (_id: number) => void;
}

export interface NCRTableProps {
    data: NCR[];
    handleDelete: (_id: number) => void;
}

export interface NGTableProps {
    data: NG[];
    handleDelete: (_id: number, production_id: number) => void;
}