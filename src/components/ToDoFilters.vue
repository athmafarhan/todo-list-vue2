<template>
  <a-space>
    <a-form-item label="Search">
      <a-input type="search" placeholder="Search..." style="width: 240px;" :value="searchText" @input="onSearchInput" />
    </a-form-item>
    <a-form-item label="Sort By">
      <a-select default-value="date-asc" style="width: 160px" :value="selectedSort" @change="onSortChange">
        <a-select-option v-for="option in Object.values(SORT_OPTIONS)" :key="option.value" :value="option.value">
          {{ option.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-space>
</template>

<script lang="ts">
import { SORT_OPTIONS } from '@/constants/sort.constant';
import Vue from 'vue';

export const ToDoFilters = Vue.extend({
  props: {
    searchText: {
      type: String,
      default: ''
    },
    selectedSort: {
      type: String,
      default: 'date-asc'
    }
  },
  data() {
    return {
      SORT_OPTIONS
    }
  },
  methods: {
    onSearchInput(e: Event) {
      this.$emit('update:search-text', (e.target as HTMLInputElement).value);
    },
    onSortChange(value: string) {
      this.$emit('update:selected-sort', value);
    }
  }

})

export default ToDoFilters;
</script>