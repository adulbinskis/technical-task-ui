export interface AuthResponse {
    userId: string;
    email: string;
    token: string;
    userName: string;
    role: string | null;
}