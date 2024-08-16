import React, { createContext, useState, useContext, FC } from 'react';
import { ProductDetail } from '../models/ProductDetail';

type Props = { children: React.ReactNode };

type ProductsContextType = {
    products: ProductDetail[];
    setProducts: React.Dispatch<React.SetStateAction<ProductDetail[]>>;
    product: ProductDetail;
    setProduct: React.Dispatch<React.SetStateAction<ProductDetail>>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: FC<Props> = ({ children }) => {
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [product, setProduct] = useState<ProductDetail>({} as ProductDetail);

    return (
        <ProductsContext.Provider value={{ products, setProducts, product, setProduct }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};