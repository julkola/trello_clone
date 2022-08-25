<script setup lang="ts">
import { defineProps } from 'vue';
import type { Task } from '../types';
import TaskComponent from './TaskComponent.vue';

const props = defineProps(['column', 'columnIndex'])

function createTask (e: Event, tasks: Task[]) {
    tasks.push({
        id: Math.floor(Math.random()*1243),
        title: (e.currentTarget as HTMLInputElement).value
    })
}
</script>
<template>
    <div class="column">
        <p class="columnName">{{ column.name }}</p>
        <TaskComponent v-for="(task, taskIndex) in column.tasks" :key="task.id" :task="task" :task-index="taskIndex"
          draggable="true" @dragstart.self="(event)=>upTask(event, taskIndex, column.name)" @drop.stop="(event)=>dispatchDrop(event, columnIndex, taskIndex)" @dragover.prevent @dragenter.prevent />
        <input @keydown.enter="(e)=>createTask(e, column.tasks)" type="text" placeholder="+ Add task" class="add-task"/>
    </div>
</template>
<style scoped>
  .column {
    width: 250px;
    padding: 25px 20px;
    background-color: rgb(131, 161, 163);
    border-radius: 5px;
  }
  .task {
    padding: 15px;
    background-color: rgb(197, 228, 230);
    border-radius: 5px;
  }
  .add-task{
    background: transparent;
    border: none;
  }
</style>