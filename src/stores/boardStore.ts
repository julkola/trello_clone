import { defineStore } from "pinia";
import defaultData from "@/default-data";
import type { newTask, Task, Column, Board } from "@/types";

function getBoardFromLocalStorage() {
  const board = localStorage.getItem(`board`);
  if (board !== null) return JSON.parse(board);
  return null;
}

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    board: getBoardFromLocalStorage() ?? defaultData,
  }),
  actions: {
    addTask(tasks: Task[], title: string) {
      tasks.push({
        id: tasks[tasks.length - 1].id + 1,
        title: title,
      });
    },
    updateTask(task: Task, key: "title" | "description" | "assignedUser", value: string) {
      task[key] = value;
    },
    moveTask(
      fromColumnIndex: number,
      toColumnIndex: number,
      taskIndex: number,
      taskUnderIndex?: number
    ) {
      const movingTask = this.board.columns[fromColumnIndex].tasks[taskIndex];
      this.board.columns[fromColumnIndex].tasks.splice(taskIndex, 1);
      if (taskUnderIndex)
        this.board.columns[toColumnIndex].tasks.splice(taskUnderIndex, 0, movingTask);
      else this.board.columns[toColumnIndex].tasks.push(movingTask);
    },
    addColumn(name: string) {
      this.board.columns.push({ name: name, tasks: [] });
    },
    moveColumn(columnUnderIndex: number, columnMovingIndex: number) {
      const movingColumn = this.board.columns[columnMovingIndex];
      this.board.columns.splice(columnMovingIndex, 1);
      this.board.columns.splice(columnUnderIndex, 0, movingColumn);
    },
  },
});
