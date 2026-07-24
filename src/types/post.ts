export interface User {
    id: number;
    email: string;
}

export interface Post {

    id: number;

    title: string;

    content: string;

    published: boolean;

    created_at: string;

    owner_id: number;

    owner: User;

}

export interface CreatePostRequest {
    title: string;
    content: string;
    published: boolean;
}

export interface UpdatePostRequest {
    title: string;
    content: string;
    published: boolean;
}