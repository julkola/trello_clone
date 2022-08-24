<script setup lang="ts">
import { useBoardStore } from './stores/boardStore';

const boardStore = useBoardStore();

function upTask (event: DragEvent, taskIndex: number, fromColumnIndex: number) {
  event.dataTransfer.setData("fromColumnIndex", `${fromColumnIndex}`)
  event.dataTransfer.setData("taskIndex", `${taskIndex}`)
}

function upColumn (event: DragEvent, fromColumnIndex: number) {
  event.dataTransfer.setData("fromColumnIndex", `${fromColumnIndex}`)
}

function downTask (event: DragEvent, toColumnIndex: number, fromColumnIndex: number) {
  const taskIndex = +event.dataTransfer.getData('taskIndex')
  const taskAbove = document.elementFromPoint(event.clientX, event.clientX);
  const taskAboveIndex = (taskAbove instanceof HTMLElement) ? +taskAbove.dataset.taskIndex : 0;
  boardStore.moveTask(fromColumnIndex, toColumnIndex, taskAboveIndex, taskIndex)
}

function downColumn (toColumnIndex, fromColumnIndex) {
  boardStore.moveColumn(toColumnIndex, fromColumnIndex)
}

function dispatchDrop(event: DragEvent, toColumnIndex: number) {
  const fromColumnIndex = +event.dataTransfer.getData('fromColumnIndex')
  if (event.dataTransfer.getData("taskIndex")!=="") downTask(event, toColumnIndex, fromColumnIndex) 
  else downColumn(toColumnIndex, fromColumnIndex)
}

</script>

<template>
  <main>
    <div v-for="(column, columnIndex) in board.columns" :key="column.name" class="column"
    draggable="true" @dragstart="upColumn(event, columnIndex)" @drop="dispatchDrop(e, columnIndex)">
      <p class="columnName">{{ column.name }}</p>
      <div v-for="(task, taskIndex) in column.tasks" :key="task.id" class="task"
      draggable="true" @dragstart="upTask(event, taskIndex, column.name)" @dragover.prevent @dragenter.prevent>
        <p class="title">{{ task.title }}</p>
        <p v-if="task.description" class="description">{{ task.description }}</p>
      </div>
      <input type="text">
    </div>
  </main>
  <CurrentTask/>
</template>

<style scoped>
  .column {
    padding: 25px 20px;
    background-color: rgb(131, 161, 163);
    border-radius: 5px;
  }
  .task {
    width: 100%;
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
