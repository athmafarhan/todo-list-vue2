<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-form-model-item label="Task" prop="task">
      <a-input v-model="form.task" @keyup.enter="onSubmit" />
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import Vue from 'vue';

export type ToDoFormCreate = {
  task: string;
};

export default Vue.extend({
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
      const formRef = this.$refs.ruleForm as any;

      formRef?.validate((valid: boolean) => {
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