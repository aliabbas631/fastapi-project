import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreatePost.css";

import { createPost } from "../api/posts";

export default function CreatePost() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [published, setPublished] = useState(true);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            await createPost({

                title,

                content,

                published,

            });

            navigate("/posts");

        } catch {

            setError("Unable to create post.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="create-post-page">

            <div className="create-post-card">

                <h1>Create New Post</h1>

                <p>
                    Share something with everyone.
                </p>

                <form
                    className="create-post-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                    <textarea
                        placeholder="Write your content..."
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        rows={8}
                        required
                    />

                    <label className="checkbox-row">

                        <input
                            type="checkbox"
                            checked={published}
                            onChange={(e) =>
                                setPublished(
                                    e.target.checked
                                )
                            }
                        />

                        Published

                    </label>

                    {error && (

                        <p className="error">

                            {error}

                        </p>

                    )}

                    <div className="button-row">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() =>
                                navigate("/posts")
                            }
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                        >

                            {

                                loading

                                    ? "Creating..."

                                    : "Create Post"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}