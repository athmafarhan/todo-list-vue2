<template>
  <div class="todo-list">
    <div class="todo-list__header">
      <h1>{{ title }}</h1>
      <ToDoFilters :search-text="searchText" :selected-sort="selectedSort" @update:search-text="searchText = $event"
        @update:selected-sort="selectedSort = $event" />
    </div>
    <ToDoForm @submit="addTodo" v-model="newTask" />

    <a-row :gutter="[24, 8]">
      <a-col :span="11">
        <h3>Task To Do ({{ undoneTodos.length }})</h3>
        <ToDoItem v-for="todo in undoneTodos" :key="todo.id" :todo="todo" :is-editing="editingIndex === todo.id"
          :editing-text="editingIndex === todo.id ? editingText : ''" :is-selected="isTodoSelected(todo.id)"
          @modal-delete="showDeleteConfirm" @toggle-select-todo="toggleSelectToDo" @start-edit="startEdit"
          @done="markAsDone" @undone="markAsUndone" @cancel-edit="cancelEdit" @save-edit="saveEdit"
          @update:editing-text="editingText = $event" />
      </a-col>
      <a-col :span="2" class="todo-list__transfer-buttons">
        <a-button type="default" icon="right" @click="toggleDoneSelectedToDo" />
        <a-button type="default" icon="double-right" @click="setAllToDoDone" />
        <a-button type="default" icon="left" @click="toggleUndoneSelectedToDo" />
        <a-button type="default" icon="double-left" @click="setAllToDoUndone" />
      </a-col>
      <a-col :span="11">
        <h3>Task Done ({{ doneTodos.length }})</h3>
        <ToDoItem v-for="todo in doneTodos" :key="todo.id" :todo="todo" :is-editing="editingIndex === todo.id"
          :editing-text="editingIndex === todo.id ? editingText : ''" :is-selected="isTodoSelected(todo.id)"
          @modal-delete="showDeleteConfirm" @toggle-select-todo="toggleSelectToDo" @start-edit="startEdit"
          @done="markAsDone" @undone="markAsUndone" @cancel-edit="cancelEdit" @save-edit="saveEdit"
          @update:editing-text="editingText = $event" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import ToDoFilters from '@/components/ToDoFilters.vue';
import ToDoForm from '@/components/ToDoForm.vue';
import ToDoItem from '@/components/ToDoItem.vue';
import { SORT_OPTIONS, Sort } from '@/constants/sort.constant';
import { ToDo, ToDoFormCreate } from '@/models/todo/todo.model';
import Vue from 'vue';
import { mapGetters } from 'vuex';

const ToDoList = Vue.extend({
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
      searchText: '',
      newTask: { task: '' },
      selectedSort: SORT_OPTIONS.DATE_ASC.value as Sort,

      editingIndex: null as null | number,
      editingText: '',

      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
  },

  computed: {
    ...mapGetters('todos', ['todos']),
    // eslint-disable-next-line no-unused-vars
    isTodoSelected(): (id: number) => boolean {
      return this.$store.getters['todos/isTodoSelected'];
    },

    filteredTodos(): ToDo[] {
      const todos = this.$store.getters['todos/todos'] as ToDo[];
      if (!this.searchText) {
        return todos;
      }
      return todos.filter(todo =>
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
    },
    undoneTodos(): ToDo[] {
      return this.sortedTodos.filter(todo => !todo.done);
    },
    doneTodos(): ToDo[] {
      return this.sortedTodos.filter(todo => todo.done);
    }
  },

  methods: {
    addTodo(task: ToDoFormCreate) {
      this.$store.dispatch('todos/addTodo', task);
    },

    toggleSelectToDo(id: number) {
      const todos = this.$store.getters['todos/todos'] as ToDo[];
      const todo = todos.find(t => t.id === id);
      if (todo) {
        this.$store.dispatch('todos/toggleSelectTodo', todo);
      }
    },

    toggleDoneSelectedToDo() {
      this.$store.dispatch('todos/toggleDoneSelected');
    },

    toggleUndoneSelectedToDo() {
      this.$store.dispatch('todos/toggleUndoneSelected');
    },

    setAllToDoDone() {
      this.$store.dispatch('todos/setAllDone');
    },

    setAllToDoUndone() {
      this.$store.dispatch('todos/setAllUndone');
    },

    markAsDone(id: number) {
      this.$store.dispatch('todos/markAsDone', id);
    },

    markAsUndone(id: number) {
      this.$store.dispatch('todos/markAsUndone', id);
    },

    startEdit(id: number) {
      const todos = this.$store.getters['todos/todos'] as ToDo[];
      const todo = todos.find(t => t.id === id);
      if (todo) {
        this.editingIndex = id;
        this.editingText = todo.task;
      }
    },

    saveEdit(id: number) {
      this.$store.dispatch('todos/updateTodo', { id, task: this.editingText });
      this.resetEdit();
    },

    cancelEdit() {
      this.resetEdit();
    },

    resetEdit() {
      this.editingIndex = null;
      this.editingText = '';
    },

    showDeleteConfirm(id: number) {
      this.$confirm({
        title: 'Are you sure delete this task?',
        content: 'The deleted task cannot be recovered!',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          this.$store.dispatch('todos/removeTodo', id);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
  },

  mounted() {
    this.$store.dispatch('todos/fetchTodos');
  },
});
export default ToDoList;
</script>

<style scoped>
.todo-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-list__transfer-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}
</style>
