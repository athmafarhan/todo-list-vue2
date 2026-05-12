<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>{{ title }}</h1>
      <ToDoFilters :search-text="searchText" :selected-sort="selectedSort" update:search-text="searchText = $event"
        @update:selected-sort="selectedSort = $event" />
    </div>
    <ToDoForm ref="todoForm" @submit="addTodo" />

    <ToDoItem v-for="todo in sortedTodos" :key="todo.id" :todo="todo" :is-editing="editingIndex === todo.id"
      :editing-text="editingIndex === todo.id ? editingText : ''" @delete="removeTodo" @toggle-done="toggleDone"
      @start-edit="startEdit" @cancel-edit="cancelEdit" @save-edit="saveEdit"
      @update:editing-text="editingText = $event" />
  </div>
</template>

<script lang="ts">
import ToDoFilters from '@/components/ToDoFilters.vue';
import ToDoForm, { ToDoFormCreate } from '@/components/ToDoForm.vue';
import ToDoItem from '@/components/ToDoItem.vue';
import { SORT_OPTIONS, Sort } from '@/constants/sort.constant';
import Vue from 'vue';

type ToDo = {
  id: number;
  task: string;
  done: boolean;
};

export const ToDoList = Vue.extend({
  components: {
    ToDoItem,
    ToDoForm,
    ToDoFilters
  },

  props: {
    title: String,
  },

  data() {
    return {
      SORT_OPTIONS,
      todos: [] as ToDo[],
      searchText: '' as string,
      selectedSort: SORT_OPTIONS.DATE_ASC.value as Sort,

      editingIndex: null as null | number,
      editingText: '' as string,

      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
  },

  computed: {
    filteredTodos(): ToDo[] {
      if (!this.searchText) {
        return this.todos;
      }
      return this.todos.filter(todo =>
        todo.task.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    sortedTodos(): ToDo[] {
      const todos = [...this.filteredTodos];

      switch (this.selectedSort) {
        case SORT_OPTIONS.DATE_ASC.value:
          return todos.sort((a, b) => a.id - b.id);
        case SORT_OPTIONS.DATE_DESC.value:
          return todos.sort((a, b) => b.id - a.id);
        case SORT_OPTIONS.A_Z.value:
          return todos.sort((a, b) => a.task.localeCompare(b.task));
        case SORT_OPTIONS.Z_A.value:
          return todos.sort((a, b) => b.task.localeCompare(a.task));
        case SORT_OPTIONS.DONE_FIRST.value:
          return todos.sort((a, b) => (a.done === b.done) ? 0 : a.done ? -1 : 1);
        case SORT_OPTIONS.UNDONE_FIRST.value:
          return todos.sort((a, b) => (a.done === b.done) ? 0 : a.done ? 1 : -1);
        default:
          return todos;
      }
    }
  },

  methods: {
    buildTodo(form: ToDoFormCreate): ToDo {
      return {
        id: Date.now(),
        task: form.task,
        done: false
      } as ToDo
    },

    addTodo(task: ToDoFormCreate) {
      this.todos.push(this.buildTodo(task));
    },

    removeTodo(id: number) {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },

    toggleDone(id: number, checked: boolean) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.done = checked;
      }
    },

    startEdit(id: number) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        this.editingIndex = id;
        this.editingText = todo.task;
      }
    },

    saveEdit(id: number) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.task = this.editingText;
      }
      this.resetEdit();
    },

    cancelEdit() {
      this.resetEdit();
    },

    resetEdit() {
      this.editingIndex = null;
      this.editingText = '';
    },

    getLocalStorage() {
      const savedTodos = localStorage.getItem('my-todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    },

    setLocalStorage(newTodos: ToDo[]) {
      localStorage.setItem('my-todos', JSON.stringify(newTodos));
    },

    resetForm() {
      const formRef = this.$refs.todoForm as any;
      formRef?.resetForm();
    }
  },

  mounted() {
    this.getLocalStorage();
  },

  watch: {
    todos: {
      handler: "setLocalStorage",
      deep: true
    }
  }
});
export default ToDoList;
</script>