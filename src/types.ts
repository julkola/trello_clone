interface newTask {
    title: string,
    description?: string,
    assignedUser?: string
}
interface Task {
    id: number,
    title: string,
    description?: string,
    assignedUser?: string
}
interface Column {
    name: string,
    tasks: Task[]
}
interface Board {
    name: string,
    columns: Column[]
}

export type { newTask, Task, Column, Board }