'use client'

import {useEffect, useState} from "react";
import {addItemReq, deleteItemReq, getItemsReq, renameItemReq, updateItemReq} from "@/utils/api";
import TodoInputSubmit from "@/components/TodoInputSubmit";
import Button from "@/components/Button";
import Link from "next/link";

const TodoDetailPage = ({params}) => {
    const checklistId = params.id
    const [items, setItems] = useState()
    const [inputItemState, setInputItemState] = useState({
        itemName: ''
    })
    const [renamingItem, setRenamingItem] = useState({
        itemName: '',
        id: ''
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await getItemsReq(checklistId)
                console.log(res)
                setItems(res.data.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchTodo()
    }, [])

    const handleCreateItem = async () => {
        try {
            const res = await addItemReq(checklistId, inputItemState)

            const updatedItems = [...items, res.data.data]
            setItems(updatedItems)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteItem = async (itemId) => {
        try {
            const res = await deleteItemReq(checklistId, itemId)

            const updatedItems = items.filter(item => item.id !== itemId)
            setItems(updatedItems)
        } catch (e) {
            console.log(e)
        }
    }

    const handleUpdateItemStatus = async (itemId) => {
        try {
            const res = await updateItemReq(checklistId, itemId)

            const updatedItemIndex = items.findIndex(item => item.id === itemId)
            const updatedItems = [...items]
            updatedItems[updatedItemIndex] = res.data.data
            setItems(updatedItems)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSetRenamingItem = (item) => {
        setRenamingItem({
            name: item.name,
            id: item.id
        })
    }

    const handleSaveRenamingItem = async () => {
        try {
            const res = await renameItemReq(checklistId, renamingItem.id, {itemName: renamingItem.name})

            const updatedItemIndex = items.findIndex(item => item.id === renamingItem.id)
            const updatedItems = [...items]
            updatedItems[updatedItemIndex] = res.data.data
            setItems(updatedItems)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-3 items-center">
                <Link href={`/todo`}>Back</Link>
                <h1 className="text-2xl font-bold">TODO LIST</h1>
            </div>

            <TodoInputSubmit
                value={inputItemState.itemName}
                onChange={(e) => setInputItemState({...inputItemState, itemName: e.target.value})}
                onSubmit={handleCreateItem}
            />

            <div className="w-full space-y-3">
                {items && items.map((item, index) => (
                    <div key={item.id} className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" onChange={() => handleUpdateItemStatus(item.id)}
                                   checked={item.itemCompletionStatus} className="size-6"/>
                            <input
                                type="text"
                                value={renamingItem.id === item.id ? renamingItem.name : item.name}
                                onChange={(e) => setRenamingItem({
                                    ...renamingItem,
                                    name: e.target.value
                                })}
                                readOnly={renamingItem.id !== item.id}
                                className={renamingItem.id === item.id ? 'border-2 border-blue-500' : ''}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => handleSetRenamingItem(item)} color="blue" title="Rename"/>
                            {
                                renamingItem.id === item.id && (
                                    <button
                                        onClick={() => handleSaveRenamingItem()}
                                        className="py-1 px-4 bg-green-500 rounded-4 text-white"
                                    >
                                        Save
                                    </button>
                                )
                            }
                            <Button onClick={() => handleDeleteItem(item.id)} color="red" title="Delete"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoDetailPage