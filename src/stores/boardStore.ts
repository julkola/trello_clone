import { defineStore } from "pinia";
import defaultData from "@/default-data";
import type { newTask, Task, Column, Board } from "@/types";

function getBoardFromLocalStorage () {
    const board = localStorage.getItem(`board`)
    if (board!==null) return JSON.parse(board)
    return null
}

export const useBoardStore = defineStore({
    id: 'board',
    state: () => ( { 
        board: getBoardFromLocalStorage() ?? defaultData
    } ),
    actions: {
        addTask ( tasks: Task[], name: string ) {
            tasks.push({
                id: tasks[tasks.length-1].id + 1,
                name: name,
            })
        },
        updateTask ( task: Task, key: ( 'name' | 'description' | 'assignedUser'), value: string ) {
            task[key] = value
        }
    }
})