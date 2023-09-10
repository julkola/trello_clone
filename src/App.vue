<script setup lang="ts">
import { useBoardStore } from './stores/boardStore';
import ColumnComponent from './components/ColumnComponent.vue';
import TaskComponent from './components/TaskComponent.vue';
import Drag from './components/Drag.vue';

const boardStore = useBoardStore();

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
    <Drag v-for="(column, columnIndex) in boardStore.board.columns" :key="column.name"
    :drag-data="[['fromColumnIndex', columnIndex]]">
      <ColumnComponent :column="column" :column-index="columnIndex"
      @dispatch-drop="(event, toColumnIndex, taskUnderIndex)=>dispatchDrop(event, toColumnIndex, taskUnderIndex)"
      >
      <Drag v-for="(task, taskIndex) in column.tasks" :key="task.id"
      :drag-data="[['taskIndex', taskIndex], ['fromColumnIndex', columnIndex]]">
        <TaskComponent 
          :task="task" :task-index="taskIndex" :column-index="columnIndex"
          @dispatch-drop="(event, toColumnIndex, taskUnderIndex)=>dispatchDrop(event, toColumnIndex, taskUnderIndex)"
        />
      </Drag>
      </ColumnComponent>
    </Drag>
    <div class="column">
      <label for="add-column">
        Add group
      </label>
      <input id="add-column" @keyup.enter="(e) => {
        boardStore.addColumn((e.currentTarget as HTMLInputElement).value); (e.currentTarget as HTMLInputElement).value = '';
      }">
    </div>
  </main>
  <RouterView v-slot="{ Component }">
    <Transition name="slide-fade">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped>
main{
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
</style>
