'use client'

import {useEffect, useState} from "react";
import {addChecklistsReq, deleteChecklistReq, getChecklistsReq} from "@/utils/api";
import Link from "next/link";
import TodoInputSubmit from "@/components/TodoInputSubmit";

const TodoPage = () => {
    const [todos, setTodos] = useState([])
    const [inputTodoState, setInputTodoState] = useState({
        name: ''
    });

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await getChecklistsReq()
                setTodos(res.data.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchTodos()
    }, [])

    const handleCreateTodo = async () => {
        try {
            const res = await addChecklistsReq(inputTodoState)

            const updatedTodos = [...todos, res.data.data]
            setTodos(updatedTodos)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteTodo = async (id) => {
        try {
            const res = await deleteChecklistReq(id)

            const updatedTodos = todos.filter(todo => todo.id !== id)
            setTodos(updatedTodos)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="space-y-5">
            <h1 className="text-center text-2xl font-bold">TODO LIST</h1>

            <TodoInputSubmit
                value={inputTodoState.name}
                onChange={(e) => setInputTodoState({...inputTodoState, name: e.target.value})}
                onSubmit={handleCreateTodo}
            />

            <div className="w-full space-y-3">
                {todos.map((todo, index) => (
                    <div key={todo.id} className="flex items-center w-full justify-between">
                        <h1>{index + 1}. {todo.name}</h1>
                        <div className="flex gap-2">
                            <Link href={`/todo/${todo.id}`}
                                  className="py-1 px-4 bg-blue-500 rounded-4 text-white">Detail</Link>

                            <button onClick={() => handleDeleteTodo(todo.id)}
                                    className="py-1 px-4 bg-red-500 rounded-4 text-white">Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoPage