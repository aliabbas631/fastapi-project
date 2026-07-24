import "./PostCard.css";

import { useNavigate } from "react-router-dom";

import type { Post } from "../types/post";

interface Props{

    post:Post;

    onDelete:(id:number)=>void;

}

export default function PostCard({

    post,

    onDelete

}:Props){

    const navigate=useNavigate();

    return(

        <div className="post-card">

            <h2>{post.title}</h2>

            <p>{post.content}</p>

            <small>

                By {post.owner.email}

            </small>

            <div className="post-actions">

                <button

                    onClick={()=>

                        navigate(`/posts/${post.id}`)

                    }

                >

                    Details

                </button>

                <button

                    onClick={()=>

                        navigate(`/posts/${post.id}/edit`)

                    }

                >

                    Edit

                </button>

                <button

                    onClick={()=>

                        onDelete(post.id)

                    }

                >

                    Delete

                </button>

            </div>

        </div>

    );

}