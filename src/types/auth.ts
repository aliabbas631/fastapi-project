export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    created_at: string;
}

export interface AuthState {
    token: string;
    user: User;
}

export interface AuthContextType {
    token: string | null;
    user: User | null;

    login: (auth: AuthState) => void;

    logout: () => void;

    isAuthenticated: boolean;
    loading: boolean;
}
