import { AxiosResponse } from "axios";
import $api from "../../../http";
import { PaginatedProducts } from "../models/PaginatedProducts";

export default class MainBoardService {
    static async getProductsList(searchCriteria: string, page: number): Promise<AxiosResponse<PaginatedProducts>> {
        return $api.get<PaginatedProducts>('/product/getProductsList',{params: {searchCriteria: searchCriteria, page: page}})
    }
}