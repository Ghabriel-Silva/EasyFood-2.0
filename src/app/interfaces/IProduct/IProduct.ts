export interface IProduct {
    name: string;
    price: number;
    quantity?: number | null;
    expirationDate?: Date | null;
    description?: string | null;
    category_id: string ;
}


export interface IProductOutput {
    id: string;
    name: string;
    price: number;
    quantity?: number | null;
    expirationDate?: Date | null;
    isAvailable: boolean;
    description?: string | null;
    created_at: Date;
    updated_at: Date;
    company: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
    } | null;
}

export interface IProductUpdate {
    name?: string;
    price?: number;
    quantity?: number | null;
    expirationDate?: Date | null;
    description?: string | null;
    category_id?: string ;
}

export interface IProductStatus {
    id:string;
    isAvailable: boolean;
} 

export interface IProductsReturn {
    data:IProduct[]
    fromCache:boolean
}
