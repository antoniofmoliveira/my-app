// 'use client';
import { createTodo } from "@/actions/createTodo";
import { removeTodo } from "@/actions/removeTodo";
import { getTodos } from "@/app/_lib/actions";
import { Todo } from "@/app/_lib/definitions";

import { useParams } from "next/navigation"

export default async function Todo({ params }: { params: { userId: string } }) {

    const todos: Todo[] = await getTodos(params.userId)

    return (
        <>
            <form action={createTodo} method="post">
                <input type="text" name="title" id="title" size={50} />
                <input type="hidden" name="todoId" value="" />
                <input type="hidden" name="userId" value={params.userId} />
                <input type="hidden" name="dueDate" value="" />
                <input type="submit" value="gravar" />
            </form>

            {
                todos &&
                todos.map((todo: Todo) => (
                    <li key={todo.todoId}><span>{todo.title}</span>
                    <form action={removeTodo}>
                        <input type="hidden" name="todoId" value={todo.todoId} />
                        <input type="hidden" name="userId" value={todo.userId} />
                        <input type="submit" value="Apagar" />
                    </form></li>
                ))
            }
        </>
    );
}