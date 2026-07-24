import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import type {
    AuthContextType,
    AuthState,
    User,
} from "../types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {

    const [token, setToken] = useState<string | null>(null);

    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedToken = localStorage.getItem("token");

        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {

            setToken(storedToken);

            setUser(
                JSON.parse(storedUser) as User
            );
        }

        setLoading(false);

    }, []);

    const login = (auth: AuthState) => {

        localStorage.setItem("token", auth.token);

        localStorage.setItem(
            "user",
            JSON.stringify(auth.user)
        );

        setToken(auth.token);

        setUser(auth.user);

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setToken(null);

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>

    );
}

export function useAuthContext() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext must be used inside AuthProvider"
        );
    }

    return context;
}