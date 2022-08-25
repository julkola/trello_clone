<script setup lang="ts">
import { useBoardStore } from './stores/boardStore';

const boardStore = useBoardStore();
let currentlyMousedOverTaskIndex: number | null = null;
let newTaskTitle: string;

function upTask (event: DragEvent, taskIndex: number, fromColumnIndex: number) {
  event.dataTransfer!.setData("fromColumnIndex", `${fromColumnIndex}`)
  event.dataTransfer!.setData("taskIndex", `${taskIndex}`)
}

function upColumn (event: DragEvent, fromColumnIndex: number) {
  event.dataTransfer!.setData("fromColumnIndex", `${fromColumnIndex}`)
}

function downTask (event: DragEvent, toColumnIndex: number, fromColumnIndex: number) {
  const taskIndex = +event.dataTransfer!.getData('taskIndex')
  const taskUnderIndex = currentlyMousedOverTaskIndex;
  boardStore.moveTask(fromColumnIndex, toColumnIndex, taskUnderIndex, taskIndex)
}

function downColumn (toColumnIndex: number, fromColumnIndex: number) {
  boardStore.moveColumn(toColumnIndex, fromColumnIndex)
}

function dispatchDrop(event: DragEvent, toColumnIndex: number) {
  const fromColumnIndex = +event.dataTransfer!.getData('fromColumnIndex')
  if (event.dataTransfer!.getData("taskIndex")!=="") downTask(event, toColumnIndex, fromColumnIndex) 
  else downColumn(toColumnIndex, fromColumnIndex)
}

function setTask(taskIndex: number) {
  currentlyMousedOverTaskIndex = taskIndex;
}
</script>

<template>
  <main>
    <div v-for="(column, columnIndex) in boardStore.board.columns" :key="column.name" class="column"
    draggable="true" @dragstart="(event)=>upColumn(event, columnIndex)" @drop="(event)=>dispatchDrop(event, columnIndex)" @dragover.prevent @dragenter.prevent>
      <p class="columnName">{{ column.name }}</p>
      <div v-for="(task, taskIndex) in column.tasks" :key="task.id" class="task" :data-task-index="taskIndex"
      draggable="true" @dragstart="(event)=>upTask(event, taskIndex, column.name)" @dragover.prevent @dragenter.prevent
      @mouseenter="() => { setTask(taskIndex) }" @mouseleave="() => { currentlyMousedOverTaskIndex = null }">
        <p class="title">{{ task.title }}</p>
        <p v-if="task.description" class="description">{{ task.description }}</p>
      </div>
      <input :value="newTaskTitle" @keydown.enter="()=>boardStore.addTask(column.tasks, newTaskTitle)" type="text">
    </div>
  </main>
</template>

<style scoped>
  .column {
    padding: 25px 20px;
    background-color: rgb(131, 161, 163);
    border-radius: 5px;
  }
  .task {
    padding: 15px;
    background-color: rgb(197, 228, 230);
    border-radius: 5px;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .description {
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
