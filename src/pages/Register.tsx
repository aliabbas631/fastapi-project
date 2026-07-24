import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

import { registerUser } from "../api/auth";

export default function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {

            setError("Passwords do not match.");

            return;
        }

        try {

            setLoading(true);

            await registerUser({
                email,
                password,
            });

            navigate("/login");

        } catch {

            setError(
                "Unable to create account. The email may already exist."
            );

        } finally {

            setLoading(false);

        }
    }

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>

                <p>
                    Create your account to continue.
                </p>

                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
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
                            ? "Creating..."
                            : "Register"}

                    </button>

                </form>

                <p className="register-footer">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );
}