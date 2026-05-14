<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules" class="todo-form">
    <a-form-model-item label="Task" prop="task">
      <a-input v-model="form.task" class="todo-form__input" @keyup.enter="onSubmit" />
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { ToDoFormCreate } from '@/models/todo/todo.model';
import { FormModel } from 'ant-design-vue';
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: Object
  },
  data() {
    return {
      form: {
        task: '',
      } as ToDoFormCreate,

      rules: {
        task: [
          {
            required: true,
            message: 'Please input task',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      this.$emit('change', this.form.task);
      const formRef = this.$refs.ruleForm as FormModel;

      formRef.validate((valid: boolean) => {
        if (!valid) return;

        this.$emit('submit', this.form);

        this.resetForm();

        formRef.resetFields();
      });
    },

    resetForm() {
      this.form.task = '';
      const formRef = this.$refs.ruleForm as any;
      formRef?.clearValidate();
    }
  },
});
</script>

<style scoped>
/* todo-form styles */
</style>
