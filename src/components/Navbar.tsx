import "./Navbar.css";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function Navbar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <h2>Mini Social</h2>

            <div>

                <button
                    onClick={() => navigate("/posts/new")}
                >
                    New Post
                </button>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}