<script setup lang="ts">
    import { defineProps } from 'vue';
    const props = defineProps(['task', 'taskIndex'])
    function goToTask (id: number) {
      console.log(id)
    }
</script>

<template>
  <div class="task" @click="()=>goToTask(task.id)">
    <p class="title">{{ task.title }}</p>
    <p v-if="task.description" class="description">{{ task.description }}</p>
  </div>
</template>

<style scoped>
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