<template>
  <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.5rem;">
    <template v-if="!isEditing">
      <a-checkbox :checked="todo.done" @change="$emit('toggle-done', todo.id, $event.target.checked)"
        style="width: 100%;">
        <span :class="{ completed: todo.done }">{{ todo.task }}</span>
      </a-checkbox>

      <a-space>
        <a-button type="default" @click="$emit('start-edit', todo.id)">
          <a-icon type="edit" theme="filled" /> Edit
        </a-button>
        <a-button type="default" @click="$emit('delete', todo.id)">
          <a-icon type="delete" theme="filled" style="color: red;" /> Delete
        </a-button>
      </a-space>
    </template>

    <template v-else>
      <a-input :value="editingText" @change="$emit('update:editing-text', $event.target.value)"
        @keyup.enter="$emit('save-edit', todo.id)" />

      <a-space>
        <a-button @click="$emit('cancel-edit')">Cancel</a-button>
        <a-button type="primary" @click="$emit('save-edit', todo.id)">Save</a-button>
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
    }
  }
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>