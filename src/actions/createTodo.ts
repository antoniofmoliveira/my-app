'use server';

import {  setTodo } from "@/app/_lib/actions";
import { Todo } from "@/app/_lib/definitions";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
    'use server';
    const todo: Todo = {
        todoId: "",
        userId: "" + formData.get('userId'),
        title: "" + formData.get('title'),
        completed: false,
        dueDate: !formData.get('dueDate') ? undefined : new Date("" + formData.get('dueDate'))
    }
    // console.log(todo);
    setTodo(todo);
    revalidatePath(`/user/${todo.userId}/todo`)
}
// http://localhost:3000/user/410544b2-4001-4271-9855-fec4b6a6442a/todo