<script setup lang="ts">
</script>

<template>
  <main>
    <div v-for="column in board.columns" :key="column.name" class="column">
      <ul v-for="task in column.tasks" :key="task.id" class="tasks">
      <li>
        <p class="title">{{ task.title }}</p>
        <p v-if="task.description" class="description">{{ task.description }}</p>
      </li>
      </ul>
      <input type="text">
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
