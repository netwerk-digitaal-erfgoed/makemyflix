<template>
  <div class="flix-list">
    <h1>Flix List</h1>
    <ul>
      <router-link
        v-for="flix in flixes"
        :key="flix.title"
        :to="flix.path">
        {{ flix.title }}
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const flixStore = useFlixStore();
const flixes = await flixStore.fetchFlixes();
</script>

<style lang="scss" scoped>
.flix-list {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  padding: var(--space-10);
}

h1 {
  margin: var(--space-4);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul li {
  margin-block: var(--space-2);
}

a {
  text-decoration: none;
  color: white;
  padding: var(--space-2);
  transition: color 0.3s ease;

  &:hover {
    color: blue;
  }
}
</style>
