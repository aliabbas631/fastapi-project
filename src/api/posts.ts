import api from "./axios";
import type { Post } from "../types/post";
import type { CreatePostRequest, UpdatePostRequest, } from "../types/post";

export async function getPosts(): Promise<Post[]> {

    const response = await api.get<Post[]>("/posts/");

    return response.data;

}

export async function deletePost(id: number) {

    await api.delete(`/posts/${id}`);

}

export async function createPost(
    post: CreatePostRequest
): Promise<Post> {

    const response = await api.post<Post>(
        "/posts/",
        post
    );

    return response.data;

}

export async function getPost(id: number): Promise<Post> {

    const response = await api.get<Post>(`/posts/${id}`);

    return response.data;

}

export async function updatePost(

    id: number,

    post: UpdatePostRequest

): Promise<Post> {

    const response = await api.put<Post>(
        `/posts/${id}`,
        post
    );

    return response.data;

}