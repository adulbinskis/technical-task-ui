import { AxiosResponse } from "axios";
import $api from "../../../http";
import { ProductDetail } from "../models/ProductDetail";

export default class ProductService {
    static async getProduct(productId: string): Promise<AxiosResponse<ProductDetail>> {
        return $api.get<ProductDetail>('/product/getProduct',{params: {productId: productId}})
    }

    static async createProduct(name: string, quantity: number, pricePerUnit: number,): Promise<AxiosResponse<ProductDetail>> {
        return $api.post<ProductDetail>('/product/CreateProduct', {name, quantity, pricePerUnit})
    }

    static async updateProduct(productId: string, name: string, quantity: number, pricePerUnit: number,): Promise<AxiosResponse<ProductDetail>> {
        return $api.put<ProductDetail>('/product/UpdateProduct', {productId, name, quantity, pricePerUnit})
    }

    static async deleteProduct(productId: string): Promise<AxiosResponse<ProductDetail>> {
        return $api.delete<ProductDetail>('/product/DeleteProduct', {
            data: { productId: productId }
        });
    }
    
}