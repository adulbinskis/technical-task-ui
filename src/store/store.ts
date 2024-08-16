import {makeAutoObservable} from "mobx";
import { IUser } from "../components/Authorization/models/IUser";
import AuthService from "../components/Authorization/services/AuthService";
import { AuthResponse } from "../components/Authorization/models/AuthResponse";
import axios from "axios";
import { API_URL } from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async registration(email: string, userName: string, password: string) {
        try {
            const response = await AuthService.registration(email, userName, password);
            console.log(response);
        } catch (e) {
            throw e;
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser({email: response.data.email, userId: response.data.userId, userName: response.data.userName, role: response.data.role});
        } catch (e) {
            throw e;
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            throw e;
        }
    }

    async checkAuth(){
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/identity/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser({email: response.data.email, userId: response.data.userId, userName: response.data.userName, role: response.data.role});
        } catch (error) {
            console.error('Error while checking authentication:', error);
        } finally {
            this.setLoading(false);
        }
    }
}