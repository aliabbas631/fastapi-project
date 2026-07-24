import api from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";
import type {
    RegisterRequest,
    User,
} from "../types/auth";

export const loginUser = async (
    credentials: LoginRequest
): Promise<LoginResponse> => {

    const form = new URLSearchParams();

    form.append("username", credentials.username);
    form.append("password", credentials.password);

    const response = await api.post<LoginResponse>(
        "/token",
        form,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
};

export const registerUser = async (
    user: RegisterRequest
): Promise<User> => {

    const response = await api.post<User>(
        "/users/",
        user
    );

    return response.data;
};
