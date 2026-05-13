import { LocalStorageService } from '@/services/localStorageService';
import { ToDo, ToDoFormCreate } from '@/models/todo/todo.model';

const TODOS_STORAGE_KEY = 'my-todos';

interface TodosState {
  todos: ToDo[];
  selectedTodos: ToDo[];
}

export default {
  namespaced: true,

  state: {
    todos: [] as ToDo[],
    selectedTodos: [] as ToDo[],
  } as TodosState,

  mutations: {
    SET_TODOS(state: TodosState, todos: ToDo[]) {
      state.todos = todos;
    },
    ADD_TODO(state: TodosState, todo: ToDo) {
      state.todos.push(todo);
    },
    REMOVE_TODO(state: TodosState, id: number) {
      const index = state.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
    UPDATE_TODO(state: TodosState, payload: { id: number; task: string }) {
      const todo = state.todos.find(t => t.id === payload.id);
      if (todo) {
        todo.task = payload.task;
      }
    },
    TOGGLE_TODO(state: TodosState, payload: { id: number; checked: boolean }) {
      const todo = state.todos.find(t => t.id === payload.id);
      if (todo) {
        todo.done = payload.checked;
      }
    },
    SET_TODO_DONE(state: TodosState, id: number) {
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.done = true;
      }
    },
    SET_TODO_UNDONE(state: TodosState, id: number) {
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.done = false;
      }
    },
    TOGGLE_SELECT_TODO(state: TodosState, todo: ToDo) {
      const index = state.selectedTodos.findIndex(t => t.id === todo.id);
      if (index === -1) {
        state.selectedTodos.push(todo);
      } else {
        state.selectedTodos.splice(index, 1);
      }
    },
    CLEAR_SELECTED_TODOS(state: TodosState) {
      state.selectedTodos = [];
    },
    SET_ALL_DONE(state: TodosState) {
      state.todos.forEach(todo => {
        todo.done = true;
      });
    },
    SET_ALL_UNDONE(state: TodosState) {
      state.todos.forEach(todo => {
        todo.done = false;
      });
    },
    MARK_SELECTED_DONE(state: TodosState) {
      state.selectedTodos.forEach(selectedTodo => {
        const todo = state.todos.find(t => t.id === selectedTodo.id);
        if (todo) {
          todo.done = true;
        }
      });
    },
    MARK_SELECTED_UNDONE(state: TodosState) {
      state.selectedTodos.forEach(selectedTodo => {
        const todo = state.todos.find(t => t.id === selectedTodo.id);
        if (todo) {
          todo.done = false;
        }
      });
    },
  },

  actions: {
    fetchTodos({ commit }: any) {
      const todos = LocalStorageService.get<ToDo[]>(TODOS_STORAGE_KEY);
      commit('SET_TODOS', todos || []);
    },
    persistTodos({ state }: any) {
      LocalStorageService.set(TODOS_STORAGE_KEY, state.todos);
    },
    addTodo({ commit, dispatch }: any, form: ToDoFormCreate) {
      const todo: ToDo = {
        id: Date.now(),
        task: form.task,
        done: false,
      };
      commit('ADD_TODO', todo);
      dispatch('persistTodos');
    },
    removeTodo({ commit, dispatch }: any, id: number) {
      commit('REMOVE_TODO', id);
      dispatch('persistTodos');
    },
    updateTodo({ commit, dispatch }: any, payload: { id: number; task: string }) {
      commit('UPDATE_TODO', payload);
      dispatch('persistTodos');
    },
    toggleTodo({ commit, dispatch }: any, payload: { id: number; checked: boolean }) {
      commit('TOGGLE_TODO', payload);
      dispatch('persistTodos');
    },
    markAsDone({ commit, dispatch }: any, id: number) {
      commit('SET_TODO_DONE', id);
      dispatch('persistTodos');
    },
    markAsUndone({ commit, dispatch }: any, id: number) {
      commit('SET_TODO_UNDONE', id);
      dispatch('persistTodos');
    },
    toggleSelectTodo({ commit }: any, todo: ToDo) {
      commit('TOGGLE_SELECT_TODO', todo);
    },
    toggleDoneSelected({ commit, dispatch }: any) {
      commit('MARK_SELECTED_DONE');
      commit('CLEAR_SELECTED_TODOS');
      dispatch('persistTodos');
    },
    toggleUndoneSelected({ commit, dispatch }: any) {
      commit('MARK_SELECTED_UNDONE');
      commit('CLEAR_SELECTED_TODOS');
      dispatch('persistTodos');
    },
    setAllDone({ commit, dispatch }: any) {
      commit('SET_ALL_DONE');
      dispatch('persistTodos');
    },
    setAllUndone({ commit, dispatch }: any) {
      commit('SET_ALL_UNDONE');
      dispatch('persistTodos');
    },
  },

  getters: {
    todos: (state: TodosState) => state.todos,
    selectedTodos: (state: TodosState) => state.selectedTodos,
    isTodoSelected: (state: TodosState) => (id: number): boolean => {
      return state.selectedTodos.some(t => t.id === id);
    },
  },
};
