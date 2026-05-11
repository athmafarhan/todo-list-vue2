<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>{{ title }}</h1>

      <a-space>
        <a-form-item label="Search">
          <a-input type="search" placeholder="Search..." style="width: 240px;" @change="handleChangeSearch($event)" />
        </a-form-item>

        <a-form-item label="Sort By">
          <a-select default-value="date-asc" style="width: 160px" @change="handleChangeSort">
            <a-select-option value="date-asc">
              Date (ASC)
            </a-select-option>
            <a-select-option value="date-desc">
              Date (DESC)
            </a-select-option>
            <a-select-option value="a-z">
              A to Z
            </a-select-option>
            <a-select-option value="z-a">
              Z to A
            </a-select-option>
            <a-select-option value="done-first">
              Done First
            </a-select-option>
            <a-select-option value="undone-first">
              Undone First
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-space>
    </div>
    <a-form-model-item label="Task">
      <a-input v-model="newTask" @keyup.enter="addTodo" />
    </a-form-model-item>
    <div v-for="todo in sortedTodos" :key="todo.id"
      style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.5rem;">

      <template v-if="editingIndex !== todo.id">
        <a-checkbox v-model="todo.done" style="width: 100%;">
          <span :class="{ completed: todo.done }">
            {{ todo.text }}
          </span>
        </a-checkbox>

        <a-space>
          <a-button type="default" @click="startEdit(todo.id)">
            <a-icon type="edit" theme="filled" />
            Edit
          </a-button>

          <a-button type="default" @click="removeTodo(todo.id)">
            <a-icon type="delete" theme="filled" style="color: red;" />
            Delete
          </a-button>
        </a-space>
      </template>

      <template v-else>
        <a-input v-model="editingText" @keyup.enter="saveEdit(todo.id)" />

        <a-space>
          <a-button @click="cancelEdit">
            Cancel
          </a-button>

          <a-button type="primary" @click="saveEdit(todo.id)">
            Save
          </a-button>
        </a-space>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type ToDo = {
  id: number;
  text: string;
  done: boolean;
};

const ToDoList = Vue.extend({
  props: {
    title: String,
  },

  data() {
    return {
      newTask: '' as string,
      todos: [] as ToDo[],
      search: '' as string,
      sortBy: 'date-asc' as string,
      editingIndex: null as null | number,
      editingText: '' as string,
      nextId: 1 as number,

      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
  },

  computed: {
    filteredTodos(): ToDo[] {
      if (!this.search) {
        return this.todos;
      }
      return this.todos.filter(todo =>
        todo.text.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    sortedTodos(): ToDo[] {
      const todos = [...this.filteredTodos];

      switch (this.sortBy) {
        case 'date-asc':
          return todos.sort((a, b) => a.id - b.id);
        case 'date-desc':
          return todos.sort((a, b) => b.id - a.id);
        case 'a-z':
          return todos.sort((a, b) => a.text.localeCompare(b.text));
        case 'z-a':
          return todos.sort((a, b) => b.text.localeCompare(a.text));
        case 'done-first':
          return todos.sort((a, b) => (a.done === b.done) ? 0 : a.done ? -1 : 1);
        case 'undone-first':
          return todos.sort((a, b) => (a.done === b.done) ? 0 : a.done ? 1 : -1);
        default:
          return todos;
      }
    }
  },

  methods: {
    handleChangeSearch(event: Event) {
      const target = event.target as HTMLInputElement;
      this.search = target.value;
    },

    handleChangeSort(value: string) {
      this.sortBy = value;
    },

    addTodo() {
      if (this.newTask.trim() === "") {
        return;
      }
      this.todos.push({
        id: Date.now(),
        text: this.newTask,
        done: false
      } as ToDo);

      this.newTask = '';
    },

    removeTodo(id: number) {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },

    startEdit(id: number) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        this.editingIndex = id;
        this.editingText = todo.text;
      }
    },

    saveEdit(id: number) {
      if (this.editingText.trim()) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
          todo.text = this.editingText;
        }
      }

      this.resetEdit()
    },

    cancelEdit() {
      this.resetEdit()
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
      localStorage.setItem(
        'my-todos',
        JSON.stringify(newTodos)
      );
    }

  },

  mounted() {
    this.getLocalStorage()
  },

  watch: {
    todos: {
      handler: "setLocalStorage",
      deep: true
    }
  }
});
export default ToDoList
</script>


<style scoped>
a {
  color: #42b983;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>