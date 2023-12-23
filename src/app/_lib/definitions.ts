export type User = {
    userId: string;
    name: string;
    email: string;
    password: string;
    bio: string;
    blocked: boolean;
};

export type Photo = {
    userId: string;
    type: string;
    photo: Buffer;
}

export type UserRole = {
    userId: string;
    userRole: string;
}

export type Roles = {
    roleId: string;
    roleName: string;
    roleDescription: string;
    listable: boolean;
}

export type Post = {
    userId: string;
    postId: string;
    title: string;
    body: string;
    tags: string;
    publishDate: Date;
    retracted: boolean;
    retractedBy: string;
    retractedDate: Date;
    hidden: boolean;
}

export type Comment = {
    postId: string;
    commentId: string;
    userId: string;
    body: string;
    publishDate: Date;
    hidden: boolean;
}

export type Todo = {
    todoId: string;
    userId: string;
    title: string;
    completed: boolean;
    dueDate?: Date;
}
