export interface List {
    id?: string;
    name?: string;
    created_at?: Date;
    tasks?: Task[];
    archived?: boolean;
    category_id?: string;
}


type stateRange = 0|1;
export interface Task {
    id?: string;
    name?: string;
    state?: stateRange;
    created_at?: Date;
    updated_at?: Date;
    list_id?: string;
}

export interface Category {
    id?: string;
    name?: string;
    created_at?: Date;
}

export interface Note {
    id?: string;
    content?: string;
    created_at?: Date;
}
