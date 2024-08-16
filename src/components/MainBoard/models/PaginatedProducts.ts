import { ProductDetail } from "../../Products/models/ProductDetail";

export interface PaginatedProducts {
    totalPages: number;
    products: ProductDetail[];
}