import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/AuthResponse";
import $api from '../../../http';

export default class AuthService {
    static async registration(email: string, userName: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/Identity/register', {email, userName, password})
    }

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/Identity/login', {email, password})
    }

    static async logout(): Promise<AxiosResponse<void>> {
        return $api.post<void>('/Identity/logout')
    }
}