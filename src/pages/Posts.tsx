import { useEffect, useState } from "react";

import "./Posts.css";

import Navbar from "../components/Navbar";

import PostCard from "../components/PostCard";

import { getPosts, deletePost } from "../api/posts";

import type { Post } from "../types/post";

export default function Posts(){

    const [posts,setPosts]=useState<Post[]>([]);

    const [loading,setLoading]=useState(true);

    async function loadPosts(){

        try{

            const data=await getPosts();

            setPosts(data);

        }

        finally{

            setLoading(false);

        }

    }

    useEffect(()=>{

        loadPosts();

    },[]);

    async function handleDelete(id:number){

        await deletePost(id);

        setPosts(

            posts.filter(

                post=>post.id!==id

            )

        );

    }

    if(loading){

        return(

            <h2>Loading...</h2>

        );

    }

    return(

        <>

            <Navbar/>

            <main className="posts-page">

                {

                    posts.map(post=>(

                        <PostCard

                            key={post.id}

                            post={post}

                            onDelete={handleDelete}

                        />

                    ))

                }

            </main>

        </>

    );

}