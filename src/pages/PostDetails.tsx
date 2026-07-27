import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./PostDetails.css";

import { getPost, deletePost } from "../api/posts";
import { useAuth } from "../hooks/useAuth";

import type { Post } from "../types/post";

export default function PostDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const [post, setPost] = useState<Post | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadPost() {

            try {

                const data = await getPost(Number(id));

                setPost(data);

            } catch {

                setError("Unable to load post.");

            } finally {

                setLoading(false);

            }

        }

        loadPost();

    }, [id]);

    async function handleDelete() {

        if (!post) return;

        const confirmed = window.confirm(
            "Delete this post?"
        );

        if (!confirmed) return;

        try {

            await deletePost(post.id);

            navigate("/posts");

        } catch {

            setError("Unable to delete post.");

        }

    }

    if (loading) {

        return (
            <div className="details-loading">
                Loading...
            </div>
        );

    }

    if (error) {

        return (
            <div className="details-loading">
                {error}
            </div>
        );

    }

    if (!post) {

        return (
            <div className="details-loading">
                Post not found.
            </div>
        );

    }

    return (

        <div className="details-page">

            <div className="details-card">

                <button
                    className="back-btn"
                    onClick={() => navigate("/posts")}
                >
                    ← Back
                </button>

                <h1>{post.title}</h1>

                <p className="details-author">

                    By {post.owner.email}

                </p>

                <p className="details-date">

                    {new Date(
                        post.created_at
                    ).toLocaleString()}

                </p>

                <hr />

                <div className="details-content">

                    {post.content}

                </div>

                <hr />

                <p>

                    <strong>Published:</strong>{" "}

                    {post.published ? "Yes" : "No"}

                </p>

                {

                    post.owner_id === user?.id && (

                        <div className="details-actions">

                            <button

                                onClick={() =>

                                    navigate(
                                        `/posts/${post.id}/edit`
                                    )

                                }

                            >

                                Edit

                            </button>

                            <button

                                className="delete-btn"

                                onClick={handleDelete}

                            >

                                Delete

                            </button>

                        </div>

                    )

                }

            </div>

        </div>

    );

}