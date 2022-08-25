<script setup lang="ts">
import { useBoardStore } from './stores/boardStore';
import ColumnComponent from './components/ColumnComponent.vue';

const boardStore = useBoardStore();
let newTaskTitle: string;

function upTask (event: DragEvent, taskIndex: number, fromColumnIndex: number) {
  event.dataTransfer!.setData("fromColumnIndex", `${fromColumnIndex}`)
  event.dataTransfer!.setData("taskIndex", `${taskIndex}`)
}

function upColumn (event: DragEvent, fromColumnIndex: number) {
  event.dataTransfer!.setData("fromColumnIndex", `${fromColumnIndex}`)
}

function downTask (event: DragEvent, toColumnIndex: number, fromColumnIndex: number, taskUnderIndex?: number) {
  const taskIndex = +event.dataTransfer!.getData('taskIndex')
  boardStore.moveTask(fromColumnIndex, toColumnIndex, taskIndex, taskUnderIndex)
}

function downColumn (toColumnIndex: number, fromColumnIndex: number) {
  boardStore.moveColumn(toColumnIndex, fromColumnIndex)
}

function dispatchDrop(event: DragEvent, toColumnIndex: number, taskUnderIndex?: number) {
  const fromColumnIndex = +event.dataTransfer!.getData('fromColumnIndex')
  if (event.dataTransfer!.getData("taskIndex")!=="") downTask(event, toColumnIndex, fromColumnIndex, taskUnderIndex) 
  else downColumn(toColumnIndex, fromColumnIndex)
}


</script>

<template>
  <main>
    <div v-for="(column, columnIndex) in boardStore.board.columns" :key="column.name"
    draggable="true" @dragstart="(event)=>upColumn(event, columnIndex)" @drop.stop="(event)=>dispatchDrop(event, columnIndex, 0)" @dragover.prevent @dragenter.prevent>
      <ColumnComponent :column="column" :column-index="columnIndex"/>
      <!-- <p class="columnName">{{ column.name }}</p>
      <div v-for="(task, taskIndex) in column.tasks" :key="task.id" class="task"
      draggable="true" @dragstart.self="(event)=>upTask(event, taskIndex, column.name)" @drop.stop="(event)=>dispatchDrop(event, columnIndex, taskIndex)" @dragover.prevent @dragenter.prevent>
        <TaskComponent :task="task"/>
      </div> -->
    </div>
  </main>
</template>

<style scoped>
</style>
