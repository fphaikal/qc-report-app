interface ReportTableProps {
    data: Report[];
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

interface NCRTableProps {
    data: [];
}