<script setup lang="ts">
    import { useBoardStore } from "../stores/boardStore";

    const boardStore = useBoardStore();
    const task = this.$route.params.task;

    function updateTask (key: ("name" | "description" | "assignedUser") , value: string) {
        boardStore.updateTask(task, key, value)
    }
</script>
<template>
    <form v-if="task" class="currentTask">
        <input v-model="task.title" class="title" type="text"
            @keydown.enter="updateTask('title', task.title)">
        <textarea v-model="task.description" class="description" cols="30" rows="10"
            @keydown.enter="updateTask('description', task.description)"></textarea>
    </form>
</template>