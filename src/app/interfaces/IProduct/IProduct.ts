
export interface IProduct {
    name: string;
    price: number;
    quantity?: number;
    expirationDate?: Date;
    description?: string;
    category_id: String;
}

export interface IProductOutput {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    expirationDate?: Date | null;
    isAvailable: boolean;
    description?: string;
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
