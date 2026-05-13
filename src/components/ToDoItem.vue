<template>
  <div :class="{ selected: isSelected }"
    style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.5rem; border-radius: 4px; padding: 0.25rem;">
    <template v-if="!isEditing">
      <a-checkbox :checked="isSelected" @change="$emit('toggle-select-todo', todo.id, $event.target.checked)"
        style="width: 100%;">
        <span :class="{ completed: todo.done }">{{ todo.task }}</span>
      </a-checkbox>

      <a-space>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item v-if="!todo.done" key="0" @click="$emit('mark-as-done', todo.id)">
              <a-icon type="check" style="color: green;" />
              Mark as Done
            </a-menu-item>
            <a-menu-item v-if="todo.done" key="1" @click="$emit('mark-as-undone', todo.id)">
              <a-icon type="close" style="color: orange;" />
              Mark as Undone
            </a-menu-item>
            <a-menu-item key="2" @click="$emit('start-edit', todo.id)">
              <a-icon type="edit" theme="filled" style="color: blue;" />
              Edit
            </a-menu-item>
            <a-menu-item key="3" @click="$emit('modal-delete', todo.id)">
              <a-icon type="delete" theme="filled" style="color: red;" />
              Delete
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px" icon="more"></a-button>
        </a-dropdown>
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
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleMenuClick() {
    },
  }
});
</script>

<style scoped>
.selected {
  background-color: #e6f7ff;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>