<script setup lang="ts">
import type { Task } from '@/types';
import { useRoute, useRouter } from 'vue-router'
import { useBoardStore } from "../stores/boardStore";
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();
const taskID = computed(() => +route.params.id);
const task = computed(() => boardStore.grabTaskById(taskID.value));
function close () {
    router.push('/')
}
</script>
<template>
    <div v-if="task" class="current-task-bg" @click.self="close">
        <form class="current-task" :key="task.id">
            <input
                v-model="task.title"
                id="title"
                class="current-task-title"
                type="text"
            >
            <textarea
                v-model="task.description"
                id="description"
                class="current-task-description"
                cols="30"
                rows="10"
            ></textarea>
        </form>
    </div>
</template>