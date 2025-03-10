<template>
    <div class="task-editing">
      <input v-model="localText" class="task-editing__input" />
      <AppButton type="primary" @click="saveTask">Сохранить</AppButton>
    </div>
  </template>
  
  <script>
  import AppButton from '@/components/UI/AppButton.vue';
  export default {
    props: { task: Object },
    components: { AppButton },
    data() {
      return { localText: this.task.text };
    },
    methods: {
      saveTask() {
        this.$emit('save', this.localText);
      }
    }
  };
  </script>
  
  <style scoped>
  .task-editing {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .task-editing__input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  </style>
  