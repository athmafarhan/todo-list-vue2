<template>
  <a-layout>
    <a-layout-header style="background: #7dbcea; color: #fff;">
      Hands On Vue 2 + Ant Design Vue
    </a-layout-header>
    <a-layout-content class="container">
      <ToDoList title="To Do List App" />
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import ToDoList from './views/ToDoList.vue';

const App = Vue.extend({
  components: {
    ToDoList,
  },
});
export default App
</script>

<style>
/* #app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */

.container {
  padding: 1.5rem 1.5rem 1.5rem 1.5rem
}
</style>