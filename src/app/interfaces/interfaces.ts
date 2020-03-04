export interface List {
    id?: string;
    name?: string;
    note?: string;
    created_at?: Date;
    tasks?: Task[];
    archived?: boolean;
    color?: string;
    category_id?: string;
}


export interface Task {
    id?: string;
    name?: string;
    state?: boolean;
    created_at?: Date;
    updated_at?: Date;
    list_id?: string;
    fav?: boolean;
}

export interface Category {
    id?: string;
    name?: string;
    icon?: string;
    created_at?: Date;
}

export interface Note {
    id?: string;
    name?: string;
    fav?: boolean;
    created_at?: Date;
}
