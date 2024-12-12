interface Report {
    _id: number;
    name_part: string;
    operator: string;
    process: string;
    target: number;
    start: string | null;
    end: string | null;
    total: number;
    persen: number;
    ok: number;
    ng: number;
    type_ng: string;
    keterangan: string;
    created_at: string;
    username: string;
    value: number;

    info_date: string;
    department_section: string;
    problem: string;
    source: string;
    item: string;
    customer: string;
    description: string;
    cause: string;
    countermeasure: string;
    form_type: string;
    pic: string;
    start_date: string;
    progress: string;
    target_due: string;
    actual_finish: string;

    ncr_date: string; // Should be in 'YYYY-MM-DD' format
    section: string;
    product_name: string;
    last_process: string;
    ng_type: string;
    ng_quantity: number;
    detection: string;
    status: 'repair' | 'reject'; // Restricted to these two values
    month: number;
    year: number;
    data: [];

    actual: number;
    part_name: string;
    prod: Number;
    production_id: number;

    title: string;
    content: string;
    author: string;
}