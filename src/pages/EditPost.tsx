import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./EditPost.css";

import {

    getPost,

    updatePost,

} from "../api/posts";

export default function EditPost() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [published, setPublished] = useState(true);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadPost() {

            try {

                const post = await getPost(Number(id));

                setTitle(post.title);

                setContent(post.content);

                setPublished(post.published);
                

            } catch {

                setError("Unable to load post.");

            } finally {

                setLoading(false);

            }

        }

        loadPost();

    }, [id]);

    async function handleSubmit(

        e: React.FormEvent<HTMLFormElement>

    ) {

        e.preventDefault();

        try {

            setSaving(true);

            await updatePost(

                Number(id),

                {

                    title,

                    content,

                    published,

                }

            );

            navigate("/posts");

        } catch {

            setError("Unable to update post.");

        } finally {

            setSaving(false);

        }

    }

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="edit-post-page">

            <div className="edit-post-card">

                <h1>Edit Post</h1>

                <p>

                    Update your post.

                </p>

                <form

                    className="edit-post-form"

                    onSubmit={handleSubmit}

                >

                    <input

                        type="text"

                        value={title}

                        onChange={(e) =>

                            setTitle(e.target.value)

                        }

                        required

                    />

                    <textarea

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

                            disabled={saving}

                        >

                            {

                                saving

                                    ? "Saving..."

                                    : "Save Changes"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}