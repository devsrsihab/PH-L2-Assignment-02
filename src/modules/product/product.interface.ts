
// variants type
export type TVariants = {
    type: string; 
    value: string;
}

// inventors type
export type TInventory = {
    quantity: number;
    inStock: boolean;
}

// product type
export type TProduct = {
name: string;
description: string;
price: string;
category: string;
tags: string;
variants: TVariants[];
inventory: TInventory

}