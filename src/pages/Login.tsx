import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../api/users";

import type { JwtPayload } from "../types/jwt";

import "./Login.css";

import { loginUser } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            const data = await loginUser({
                username,
                password,
            });

           const payload = jwtDecode<JwtPayload>(
                data.access_token
            );

            const user = await getUser(
                payload.user_id
            );

            login({

                token: data.access_token,

                user,

            });

            navigate("/posts");

        } catch {

            setError("Invalid email or password.");

        } finally {

            setLoading(false);

        }
    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Welcome Back</h1>

                <p>
                    Login to continue.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    {error && (

                        <p className="error">
                            {error}
                        </p>

                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>

                <p className="login-footer">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );
}