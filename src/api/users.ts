import api from "./axios";

import type { User } from "../types/auth";

export async function getUser(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);

    return response.data;
}