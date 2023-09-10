<script setup lang="ts">
import { useRouter } from "vue-router";
    const props = defineProps(['task', 'taskIndex', 'columnIndex'])
    const emits = defineEmits(['dispatchDrop', 'upTask'])
    const router = useRouter();
    function goToTask (id: number) {
      router.push(`/tasks/${id}`)
    }
</script>

<template>
  <div class="task" @click="()=>goToTask(task.id)"
    @drop.stop="(event)=>emits('dispatchDrop', event, columnIndex, taskIndex)"
    @dragover.prevent="()=>{}" @dragenter.prevent="()=>{}"
  >
    <span class="title">{{ task.title }}</span>
    <span v-if="task.description" class="description">{{ task.description }}</span>
  </div>
</template>