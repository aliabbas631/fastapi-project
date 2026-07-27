import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";

export default function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                    />
                }
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/posts"
                element={
                    <ProtectedRoute>

                        <div>
                            <Posts/>
                        </div>

                    </ProtectedRoute>
                }
            />

            <Route
                path="/posts/:id"
                element={
                    <ProtectedRoute>
                        <PostDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/posts/new"
                element={
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/posts/:id/edit"
                element={
                    <ProtectedRoute>
                        <EditPost />
                    </ProtectedRoute>
                }
            />  

        </Routes>

    );
}