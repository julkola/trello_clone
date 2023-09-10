<script setup lang="ts">
import type { Task } from '../types';

const props = defineProps(['column', 'columnIndex'])
const emits = defineEmits(['dispatchDrop'])

function createTask (e: Event, tasks: Task[]) {
  if (!(e.currentTarget as HTMLInputElement).value) return
  tasks.push({
      id: Math.floor(Math.random()*1243),
      title: (e.currentTarget as HTMLInputElement).value
  });
  (e.currentTarget as HTMLInputElement).value = '';
}
</script>
<template>
    <div class="column"
      @drop.stop="(event)=>emits('dispatchDrop', event, columnIndex, 0)"
      @dragover.prevent="()=>{}" @dragenter.prevent="()=>{}"
    >
        <span class="column-name">
          {{ column.name }}
        </span>
        <slot/>
        <input @keydown.enter="(e)=>createTask(e, column.tasks)" type="text" placeholder="+ Add task" class="add-task"/>
    </div>
</template>