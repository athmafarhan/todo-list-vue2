<template>
  <a-layout>
    <a-layout-header class="app__header">
      Hands On Vue 2 + Ant Design Vue
    </a-layout-header>
    <a-layout-content class="app__content">
      <ToDoList title="To Do List App" />
    </a-layout-content>
    <a-layout-footer class="app__footer">Footer</a-layout-footer>
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
.app__header {
  background: #7dbcea;
  color: #fff;
}

.app__content {
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
}

</style>
