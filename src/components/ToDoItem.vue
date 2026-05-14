<template>
  <div :class="{ 'todo-item--selected': isSelected }" class="todo-item">
    <template v-if="!isEditing">
      <a-checkbox :checked="isSelected" @change="$emit('toggle-select-todo', todo.id, $event.target.checked)"
        class="todo-item__checkbox">
        <span :class="{ 'todo-item__text--completed': todo.done }" class="todo-item__text">{{ todo.task }}</span>
      </a-checkbox>

      <a-space>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item v-if="!todo.done" key="0" @click="$emit('done', todo.id)">
              <a-icon type="check" class="todo-item__icon--success" />
              Mark as Done
            </a-menu-item>
            <a-menu-item v-if="todo.done" key="1" @click="$emit('undone', todo.id)">
              <a-icon type="close" class="todo-item__icon--warning" />
              Mark as Undone
            </a-menu-item>
            <a-menu-item key="2" @click="$emit('start-edit', todo.id)">
              <a-icon type="edit" theme="filled" class="todo-item__icon--primary" />
              Edit
            </a-menu-item>
            <a-menu-item key="3" @click="$emit('modal-delete', todo.id)">
              <a-icon type="delete" theme="filled" class="todo-item__icon--danger" />
              Delete
            </a-menu-item>
          </a-menu>
          <a-button class="todo-item__more-btn" icon="more"></a-button>
        </a-dropdown>
      </a-space>
    </template>

    <template v-else>
      <a-input :value="editingText" @change="$emit('update:editing-text', $event.target.value)"
        @keyup.enter="$emit('save-edit', todo.id)" class="todo-item__edit-input" />

      <a-space>
        <a-button class="todo-item__btn--cancel" @click="$emit('cancel-edit')">Cancel</a-button>
        <a-button class="todo-item__btn--save" type="primary" @click="$emit('save-edit', todo.id)">Save</a-button>
      </a-space>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    todo: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    },
    editingText: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  padding: 0.25rem;
}

.todo-item--selected {
  background-color: #e6f7ff;
}

.todo-item__checkbox {
  width: 100%;
}

.todo-item__text--completed {
  text-decoration: line-through;
  color: gray;
}

.todo-item__more-btn {
  margin-left: 8px;
}

.todo-item__icon--success {
  color: green;
}

.todo-item__icon--warning {
  color: orange;
}

.todo-item__icon--primary {
  color: blue;
}

.todo-item__icon--danger {
  color: red;
}

</style>
